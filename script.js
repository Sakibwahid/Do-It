function parseTaskDetails(input) {
    const lower = input.toLowerCase();

    const dateMatch = lower.match(
        /\b(\d{1,2})(?:st|nd|rd|th)?\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)\b/
    );
    console.log(dateMatch[0]);

    const trimmeddate = dateMatch[0].replace(/st|nd|rd|th/, '');
    const yearadded = new Date(trimmeddate + '2025')
    yearadded.setHours(12);
    const cleandate = yearadded.toISOString().split('T')[0];
    console.log(cleandate);

    const priorityMatch = lower.match(/\b(high|medium|low)\b/);
    const priority = priorityMatch ? priorityMatch[0] : 'normal';

    let taskTitle = lower;
    if (dateMatch) taskTitle = taskTitle.replace(dateMatch[0], '');
    if (priorityMatch) taskTitle = taskTitle.replace(priorityMatch[0], '');
    taskTitle = taskTitle.trim();
    taskTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1);

    return {
        task: taskTitle || 'Untitled task',
        cleandate,
        priority
    };
}

function TaskList() {
  const taskList = JSON.parse(localStorage.getItem('taskDetails')) || [];

  const sortedTasks = taskList.sort((a, b) => new Date(a.cleandate) - new Date(b.cleandate));

  const container = document.getElementById('tasklist');
  if(!taskList.length) {
    container.innerHTML = '<li class="p-3 rounded bg-gray-100 shadow-sm border border-gray-300">No tasks available</li>';
    return;
  }
  container.innerHTML = '';

  sortedTasks.forEach(task => {
    const li = document.createElement('li');
    let bgClass = 'bg-gray-100';
    if (task.priority === 'high') bgClass = 'bg-red-300';
    else if (task.priority === 'medium') bgClass = 'bg-yellow-300';
    else if (task.priority === 'low') bgClass = 'bg-green-300';

    li.className = `p-3 rounded ${bgClass} shadow-sm border border-gray-300`;
    li.innerHTML = `<strong>${task.task}</strong><br><span class="text-sm text-gray-600">${task.cleandate} </span>`;
    container.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('task').value.trim();
        if (!input) return alert('Please enter a task.');
        const parseddata = parseTaskDetails(input);
        const taskList = JSON.parse(localStorage.getItem('taskDetails')) || [];
        taskList.push(parseddata);
        localStorage.setItem('taskDetails', JSON.stringify(taskList));
        TaskList();
    })

    document.getElementById('stepbutton').onclick = () => {
        console.log('clicked');
        document.getElementById('steps').classList.toggle('hidden');
    }

    TaskList();
});




