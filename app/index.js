import { archive } from './archive.js';
import categoriesIcon from './categoriesIcon.js';
import { data } from './data.js';

// variables for project

let closeForm = document.querySelector('#close');
let createNote = document.getElementById('create');
let modal = document.getElementById('modal-form');
let form = document.getElementById('form');
let title = document.getElementById('title');
let text = document.getElementById('text');
let select = document.getElementById('select');
let date = document.getElementById('date');
let error = document.getElementById('error');
let confirm = document.getElementById('confirm');
let editNote;
let setTitle = '';
let setText = '';
let setSelect = 0;
let setDate = '';
let archiveResults = [];
let listCatgories = ['Task', 'Random Thought', 'Idea', 'Quote'];

//rendering, calculation in archive, deleting, editing, adding to archive

let archiveStorage = () => {
  let countArchivedByCategory = {};
  let countDataByCategory = {};

  archive.forEach((item) => {
    if (typeof countArchivedByCategory[item.category] === 'undefined') {
      countArchivedByCategory[item.category] = 1;
    } else {
      countArchivedByCategory[item.category] += 1;
    }
  });

  data.forEach((item) => {
    if (typeof countDataByCategory[item.category] === 'undefined') {
      countDataByCategory[item.category] = 1;
    } else {
      countDataByCategory[item.category] += 1;
    }
  });
  archiveResults = [
    {
      icon: categoriesIcon[0],
      name: 'Task',
      active: countDataByCategory[0] === undefined ? '0' : countDataByCategory[0],
      archived: countArchivedByCategory[0] === undefined ? '0' : countArchivedByCategory[0],
    },
    {
      icon: categoriesIcon[1],
      name: 'Random Thought',
      active: countDataByCategory[1] === undefined ? '0' : countDataByCategory[1],
      archived: countArchivedByCategory[1] === undefined ? '0' : countArchivedByCategory[1],
    },
    {
      icon: categoriesIcon[2],
      name: 'Idea',
      active: countDataByCategory[2] === undefined ? '0' : countDataByCategory[2],
      archived: countArchivedByCategory[2] === undefined ? '0' : countArchivedByCategory[2],
    },
    {
      icon: categoriesIcon[3],
      name: 'Quote',
      active: countDataByCategory[3] === undefined ? '0' : countDataByCategory[3],
      archived: countArchivedByCategory[3] === undefined ? '0' : countArchivedByCategory[3],
    },
  ];
};

archiveStorage();

let onDeleteBtn = () => {
  let deleteBtn = document.getElementsByClassName('delete');
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', function () {
      data.splice(i, 1);

      archiveStorage();

      fetchData();
      fetchArchiveResults();
      fetchArchive();
    });
  }
};

let onArchiveBtn = () => {
  let archiveBoxBtn = document.getElementsByClassName('archive-box');
  for (let i = 0; i < archiveBoxBtn.length; i++) {
    archiveBoxBtn[i].addEventListener('click', function () {
      let tr = this.parentElement.parentElement;
      let id = tr.id;
      let findNote = data.find((obj) => {
        return obj.id == id;
      });
      archive.push({ ...findNote });
      data.splice(i, 1);

      archiveStorage();

      fetchData();
      fetchArchiveResults();
      fetchArchive();
    });
  }
};

let onEditBtn = () => {
  let editBtn = document.getElementsByClassName('edit');
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', function () {
      let tr = this.parentElement.parentElement;
      let id = tr.id;

      let findNote = data.find((obj) => {
        return obj.id == id;
      });
      confirm.innerText = 'Edit';
      editNote = i;

      title.value = findNote.title;
      text.value = findNote.content;
      select.value = findNote.category;
      date.value = '';
      error.innerText = '';

      setTitle = findNote.title;
      setText = findNote.content;
      setSelect = findNote.category;

      modal.style.display = 'block';

      archiveStorage();

      fetchData();
      fetchArchiveResults();
      fetchArchive();
    });
  }
};

let onOpenArchiveBoxBtn = () => {
  let openArchiveBox = document.getElementsByClassName('open-archive-box');
  for (let i = 0; i < openArchiveBox.length; i++) {
    openArchiveBox[i].addEventListener('click', function () {
      let tr = this.parentElement.parentElement;
      let id = tr.id;

      let findNote = archive.find((obj) => {
        return obj.id == id;
      });

      data.push({ ...findNote });
      archive.splice(i, 1);

      archiveStorage();

      fetchData();
      fetchArchiveResults();
      fetchArchive();
    });
  }
};

let fetchData = () => {
  try {
    document.getElementById('notes').innerHTML = `${data

      .map(
        (el) =>
          `<tr id=${el.id}>
                            <th scope="col">${categoriesIcon[el.category]}</i></th>
                            <th scope="col">${el.title}</th>
                            <th scope="col">${el.created}</th>
                            <th scope="col">${el.categoryTitle}</th>
                            <th scope="col">${el.content}</th>
                            <th scope="col">${el.dates}</th>
                            <th scope="col" class="icon"><i class="fa-solid fa-pen-to-square edit"></i></th>
                            <th scope="col" class="icon"><i class="fa-solid fa-box-archive archive-box"></i></th>
                            <th scope="col" class="icon"><i class="fa-solid fa-trash delete"></i></th>
                          </tr>`,
      )
      .join('')}`;

    onDeleteBtn();
    onArchiveBtn();
    onEditBtn();
  } catch (error) {
    console.warn(error);
  }
};

let fetchArchiveResults = () => {
  try {
    document.getElementById('archive').innerHTML = `${archiveResults
      .map((el) =>
        el.active !== '0' || el.archived !== '0'
          ? `<tr>
              <th scope="col">${el.icon}</th>
              <th scope="col">${el.name}</th>
              <th scope="col">${el.active}</th>
              <th scope="col">${el.archived}</th>
            </tr>`
          : '',
      )
      .join('')}`;
  } catch (error) {
    console.warn(error);
  }
};

let fetchArchive = () => {
  try {
    document.getElementById('archived-notes').innerHTML = `${archive

      .map(
        (el) =>
          `<tr id=${el.id}>
                            <th scope="col">${categoriesIcon[el.category]}</i></th>
                            <th scope="col">${el.title}</th>
                            <th scope="col">${el.created}</th>
                            <th scope="col">${el.categoryTitle}</th>
                            <th scope="col">${el.content}</th>
                            <th scope="col">${el.dates}</th>
                            <th scope="col" class="icon"><i class="fa-solid fa-box-open open-archive-box"></i></th>
                          </tr>`,
      )
      .join('')}`;
    onOpenArchiveBoxBtn();
  } catch (error) {
    console.warn(error);
  }
};

fetchData();
fetchArchiveResults();
fetchArchive();

// working with form

closeForm.addEventListener('click', function () {
  modal.style.display = 'none';
});

createNote.addEventListener('click', function () {
  confirm.innerText = 'Confirm';
  if (confirm.innerText === 'Confirm') {
    title.value = '';
    text.value = '';
    select.value = 0;
  }
  date.value = '';
  error.innerText = '';

  modal.style.display = 'block';
});

window.onclick = function (event) {
  if (event.target == modal && event.target !== form) {
    modal.style.display = 'none';
  }
};

title.addEventListener('change', function (event) {
  setTitle = event.target.value;
});

text.addEventListener('change', function (event) {
  setText = event.target.value;
});

select.addEventListener('change', function (event) {
  setSelect = event.target.value;
});

date.addEventListener('change', function (event) {
  setDate = event.target.value;
});

//adding new note to notes or editing notes
form.addEventListener('submit', function (event) {
  event.preventDefault();

  let regexpTitle = /.{1,20}$/;
  let dateObj = new Date();
  let dateCreated = dateObj.toDateString();
  let matchedDate = setText.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
  let matchedDateData = matchedDate ? matchedDate : '';
  matchedDateData = matchedDateData.length > 1 ? matchedDateData.join(', ') : matchedDateData;

  if (!regexpTitle.test(setTitle)) {
    return (error.innerText = 'Title needs to be less than 20 letters.');
  }

  if (setTitle.length < 1) {
    return (error.innerText = 'Please, write a title!');
  }

  if (setText.length > 100) {
    return (error.innerText = 'Description needs to be less than 100 letters.');
  }

  let obj = {
    id: Date.now(),
    category: setSelect,
    title: setTitle,
    created: dateCreated,
    categoryTitle: listCatgories[setSelect],
    content: setText,
    dates: setDate || matchedDateData ? setDate + ' ' + matchedDateData : '',
  };
  if (confirm.innerText === 'Confirm') {
    data.push({ ...obj });
  } else {
    data.splice(editNote, 1);
    data.push({ ...obj });
  }

  archiveStorage();

  fetchData();
  fetchArchiveResults();
  fetchArchive();

  setTitle = '';
  setText = '';
  setSelect = 0;
  setDate = '';

  modal.style.display = 'none';
});
