const restList = document.querySelector('#content__list');
const form = document.querySelector('#content__add');

// crear elementos y renderizar restaurants
function renderRest(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('class', 'content_item');
    li.setAttribute('data_id', doc.id);
    
    name.textContent = doc.data().nombre;
    city.textContent = doc.data().ubicacion;
    city.setAttribute('class', 'item__span');
    cross.textContent= 'x';
    cross.setAttribute('class', 'content__delete');
    
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    restList.appendChild(li);

    // Borrando datos
    cross.addEventListener('click', (e) =>{
        let id = e.target.parentElement.getAttribute('data_id');
        db.collection('restaurant').doc(id).delete();
    } )
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