const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    const itemList = items.querySelectorAll('.item');
    
    for(let i=0; i<itemList.length; i++) {
        let checkbox = itemList[i].querySelector('.item__checkbox');
        let text = itemList[i].querySelector('.item__text');
        let button = itemList[i].querySelector('.item__button');

        checkbox.addEventListener('click', finish);
        text.addEventListener('click', edit);
        button.addEventListener('click', deleteItem);
    }
    // TODO láta hluti í _items virka
  } 

  function formHandler(e) {
    e.preventDefault();
    let val = document.querySelector(".form__input").value;
    if(val.trim() != ""){ //passar uppÃ¡ ef manneskja slÃ¦r inn tÃ³man streng meÃ° bilum
      add(val);
      
    }
    document.querySelector(".form__input").value = "";
  }

  // event handler fyrir Ã¾aÃ° aÃ° klÃ¡ra fÃ¦rslu
  function finish(e) {
    if (e.target.classList.contains("item__checkbox")) {
      e.target.parentNode.classList.toggle("item--done");
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    console.log('finish');
    const {target} = e;
    target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log('edit');
    const {target} = e;
  
    const {textContent, parentNode} = target;

    parentNode.removeChild(target);
    
    //svona á að kalla á fallið - útbúa fallið 
    let input = el( 'input', 'item__edit');
    
    //let input = document.createElement('input');
    //input.classList.add('item__edit');
    input.addEventListener('keyup', commit);
    input.setAttribute('type', 'text');
    input.value = textContent

    input.focus();

   
   const button = parentNode.querySelector('.item__button');
   parentNode.insertBefore(input, button);

   input.focus();

   console.log(target);
    console.log(textContent);
    console.log(parentNode);

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const { target } = e;
    const {parentNode} = target;
    const { keyCode } = e;
    let texti; 
    if(keyCode === ENTER_KEYCODE){
      console.log('halloo');
      texti = target.value;
      let span = el('span', 'item__text', edit);
      let button = parentNode.querySelector('.item__button');
      parentNode.insertBefore(span, button);

      parentNode.removeChild(target);
      const txt = document.createTextNode(texti);
      span.appendChild(txt);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    var li =  el("li","item",null);
    var cb = el("input","item__checkbox",null,"checkbox");
    var span = el("span","item__text",null);
    var button = el("button","item__button",null);
    button.innerHTML = "EyÃ°a";
    span.innerHTML = value;
    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(button);
    items.appendChild(li);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const {target} = e;
    const parent  = target.parentNode;
    
    let checkbox = parent.querySelector('.item__checkbox');
    checkbox.removeEventListener('click', finish);
    
    parent.parentNode.removeChild(parent);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {

    const element = document.createElement(type);

    if (className){
      element.classList.add(className);
    }
    if (clickHandler){
      element.addEventListener('click', clickHandler)
    }
    return element;
  }

  return {
    init: init
  }
})();
