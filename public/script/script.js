
function register() {
    const name = document.getElementById('reg_name').value;
    const email = document.getElementById('reg_email').value;
    const password = document.getElementById('reg_password').value;
    const user_type = document.getElementById('reg_user_type').value;
  
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, user_type })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error(err));
  }
  
  // Login
  function login() {
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
  
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        alert(`Welcome ${data.user.name} (${data.user.user_type})`);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = data.user.user_type === 'employer' ? '/post-job.html' : '/jobs.html';
      } else {
        alert(data.error);
      }
    })
    .catch(err => console.error(err));
  }
  



  // THIS IS FOR POST-JOB
  function postJob() {
    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const salary = document.getElementById('salary').value;
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.user_type !== 'employer') {
      alert('Only employers can post jobs.');
      return;
    }
  
    fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        company,
        description,
        location,
        salary,
        posted_by: user.id
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.reload();
    })
    .catch(err => console.error('Error posting job:', err));
  }

  

  
  // THIS IS FOR JOBS 

  function fetchJobs() {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(jobs => {
        const container = document.getElementById('jobs-container');
        container.innerHTML = ''; // Clear previous jobs
  
        jobs.forEach(job => {
          const jobElement = document.createElement('div');
          jobElement.classList.add('job-card');
          jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p>${job.description}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Salary:</strong> $${job.salary}</p>
            <button onclick="applyForJob(${job.id})">Apply Now</button>
          `;
          container.appendChild(jobElement);
        });
      })
      .catch(err => console.error('Error fetching jobs:', err));
  }
  



  // THIS IS FOR APPLYING FOR JOB 

  function applyForJob(jobId) {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.user_type !== 'job_seeker') {
      alert('Only job seekers can apply.');
      return;
    }
  
    fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        job_id: jobId,
        seeker_id: user.id
      })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error('Error applying:', err));
  }

  



  // THIS IS FOR FETCHING THE APPLICATION APPLIED BY THE JOB SEEKERS
  function fetchApplicants() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.user_type !== 'employer') {
      alert('Only employers can view applicants.');
      return;
    }
  
    fetch(`/api/applicants/${user.id}`)
      .then(res => res.json())
      .then(applicants => {
        const container = document.getElementById('applicants-container');
        container.innerHTML = '';
  
        if (applicants.length === 0) {
          container.innerHTML = '<p>No applicants yet.</p>';
          return;
        }
  
        applicants.forEach(app => {
          const card = document.createElement('div');
          card.classList.add('applicant-card');
          card.innerHTML = `
            <h3>${app.name}</h3>
            <p><strong>Email:</strong> ${app.email}</p>
            <p><strong>Applied For:</strong> ${app.job_title}</p>
            <p><strong>Application Date:</strong> ${new Date(app.application_date).toLocaleDateString()}</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => console.error('Error fetching applicants:', err));
  }

  
  // THIS IS FOR FETCHING THE APPLICATION FOR JOB SEEKERS THEY HAVE APPLIED  

  function fetchMyApplications() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.user_type !== 'job_seeker') {
      alert('Only job seekers can view their applications.');
      return;
    }
  
    fetch(`/api/my-applications/${user.id}`)
      .then(res => res.json())
      .then(apps => {
        const container = document.getElementById('my-applications-container');
        container.innerHTML = '';
  
        if (apps.length === 0) {
          container.innerHTML = '<p>You have not applied to any jobs yet.</p>';
          return;
        }
  
        apps.forEach(app => {
          const div = document.createElement('div');
          div.classList.add('job-card');
          div.innerHTML = `
            <h3>${app.title}</h3>
            <p><strong>Company:</strong> ${app.company}</p>
            <p><strong>Location:</strong> ${app.location}</p>
            <p><strong>Applied on:</strong> ${new Date(app.application_date).toLocaleDateString()}</p>
          `;
          container.appendChild(div);
        });
      })
      .catch(err => console.error('Error fetching my applications:', err));
  }
  


  // THIS IS FOR DASHBOARD PAGE 


  function fetchAdminStats() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.user_type !== 'admin') {
      alert("Access denied. Only admins can view this page.");
      window.location.href = "/login.html";
      return;
    }
  
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        document.getElementById('total-users').innerText = data.total_users;
        document.getElementById('total-jobs').innerText = data.total_jobs;
        document.getElementById('total-applications').innerText = data.total_applications;
      })
      .catch(err => console.error('Failed to fetch admin stats', err));
  }
  

  // THIS IS  FETCH ADMIN STATUS 
  function loadUsers() {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(users => {
        const list = document.getElementById('user-list');
        list.innerHTML = '';
        users.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${user.name} (${user.email}) - ${user.user_type}
            <button onclick="deleteUser(${user.id})">Delete</button>
          `;
          list.appendChild(li);
        });
      });
  }
  
  function loadJobs() {
    fetch('/api/admin/jobs')
      .then(res => res.json())
      .then(jobs => {
        const list = document.getElementById('job-list');
        list.innerHTML = '';
        jobs.forEach(job => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${job.title} @ ${job.company}
            <button onclick="deleteJob(${job.id})">Delete</button>
          `;
          list.appendChild(li);
        });
      });
  }
  
  function deleteUser(id) {
    fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      .then(() => loadUsers());
  }
  
  function deleteJob(id) {
    fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
      .then(() => loadJobs());
  }
  
  // Call these after page loads
  loadUsers();
  loadJobs();
  