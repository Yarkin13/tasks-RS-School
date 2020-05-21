export const ControlBlockModule = (function () {
  const targetNode = document.querySelector('.control-block');
  const node = (
    `<div class="control-block__switcher">
      <button class="control-block__switche__btn-update"> </button>
      <button class="control-block__switche__btn-RU">RU</button>
      <button class="control-block__switche__btn-EN">EN</button>
      <button class="control-block__switche__btn-BE">BE</button>
      <button class="control-block__switche__btn-C">C°</button>
      <button class="control-block__switche__btn-F">F°</button>
    </div>
    <div class="control-block__search-form">
        <input class="control-block__search-form__input">
        <button class="control-block__search-form__btn">Search</button>
    </div>`)
  const renderControlBlock = () => {
    targetNode.insertAdjacentHTML('beforeend', node);
  };
  
  return {
    render: renderControlBlock,
  };
}());
