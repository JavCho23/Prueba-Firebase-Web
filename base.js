const restList = document.querySelector('#content__list');
const form = document.querySelector('#content__add');

// crear elementos y renderizar restaurants
function renderRest(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    
    li.setAttribute('class', 'content_item');
    li.setAttribute('data_id', doc.id);
    
    name.textContent = doc.data().nombre;
    city.textContent = doc.data().ubicacion;
    city.setAttribute('class', 'item__span');
    
    li.appendChild(name);
    li.appendChild(city);
    restList.appendChild(li);
}
db.collection('restaurant').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderRest(doc);
    });
});

// Guardando datos 
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    db.collection('restaurant').doc(form.id.value).set({
        nombre: form.name.value,
        ubicacion: form.city.value
    })
    

    form.name.value = '';
    form.id.value = '';
    form.city.value = '';
})