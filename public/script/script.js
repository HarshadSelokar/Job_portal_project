
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
  
        // Redirect based on user type
        if (data.user.user_type === 'admin') {
          window.location.href = '/admin-dashboard.html';
        } else if (data.user.user_type === 'employer') {
          window.location.href = '/post-job.html';
        } else {
          window.location.href = '/jobs.html';
        }
  
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
        container.innerHTML = '';
  
        jobs.forEach(job => {
          const card = document.createElement('div');
          card.className = 'col-md-4';
  
          card.innerHTML = `
            <div class="card shadow-sm h-100">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">${job.title}</h5>
                 
                  <p class="card-text">${job.description}</p>
                  <p class="card-text"><strong>Location:</strong> ${job.location}</p>
                  <p class="card-text"><strong>Salary:</strong> ₹${job.salary}</p>
                </div>
                <button class="btn btn-primary mt-3" onclick="applyForJob(${job.id})">Apply Now</button>
              </div>
            </div>
          `;
  
          container.appendChild(card);
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
          container.innerHTML = '<p class="text-center text-muted">No applicants yet.</p>';
          return;
        }
  
        applicants.forEach(app => {
          const div = document.createElement('div');
          div.className = 'col-md-4';
  
          div.innerHTML = `
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">${app.applicant_name}</h5>
                <p class="card-text"><strong>Email:</strong> ${app.email}</p>
                <p class="card-text"><strong>Applied For:</strong> ${app.job_title}</p>
                <p class="card-text text-muted"><strong>Applied On:</strong> ${new Date(app.application_date).toLocaleDateString()}</p>
              </div>
            </div>
          `;
  
          container.appendChild(div);
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
          container.innerHTML = '<p class="text-center text-muted">You have not applied to any jobs yet.</p>';
          return;
        }
  
        apps.forEach(app => {
          const div = document.createElement('div');
          div.className = 'col-md-4';
  
          div.innerHTML = `
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">${app.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${app.company}</h6>
                <p class="card-text"><strong>Location:</strong> ${app.location}</p>
                <p class="card-text text-muted"><strong>Applied on:</strong> ${new Date(app.application_date).toLocaleDateString()}</p>
              </div>
            </div>
          `;
  
          container.appendChild(div);
        });
      })
      .catch(err => console.error('Error fetching applications:', err));
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
  

  // THIS IS  FETCH ADMIN STATUS AND DELETE BUTTON 
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
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.user_id})">Delete</button>
            
          `;
          li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

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
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.innerHTML = `
            ${job.title} 
            <button class="btn btn-danger btn-sm" onclick="deleteJob(${job.job_id})">Delete</button>
          `;
          list.appendChild(li);
        });
      });
  }
  
  function deleteUser(id) {
    fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete user');
        return res.json();
      })
      .then(() => {
        alert('User deleted');
        loadUsers();  
      })
      .catch(err => console.error('Delete User Error:', err));
  }

  
  
  function deleteJob(id) {
    fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
      .then(() => loadJobs());
  }
  
  // Call these after page loads
  loadUsers();
  loadJobs();
  