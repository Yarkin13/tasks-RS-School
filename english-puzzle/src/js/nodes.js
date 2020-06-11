export const mainPageHeaderNode = (
  `
      <div class="main-page__control-block">
        <div class="main-page__control-block__switch-level">
        <p>Level</p>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <p>Page</p>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>
        <div class="main-page__control-block__hints">
          <button class="main-page__control-block__hints__translate"></button>
          <button class="main-page__control-block__hints__audio"></button>
          <button class="main-page__control-block__hints__background"></button>
        </div>
      </div>
      <div class="main-page__active-hints">
        <div></div>
        <p></p>
      </div>
    `
)

export const mainPageContentNode = (
  `<div class="main-page__main-block">
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
    <div class="main-page__main-block__string">
    </div>
  </div>`
)

export const mainPageResultBlockNode = (
  `<div class="main-page__result-block"></div>`
)

export const mainPageButtonsBlockNode = (
  `   <div class="main-page__buttons">
        <button class="main-page__buttons__check">check</button>
        <button class="main-page__buttons__dnt-know">i don't know</button>
        <button class="main-page__buttons__clear">clear</button>
      </div>`
)

export const nodeAuthorizationPage = (
  `<div class="authorization-page">
      <p class="authorization-page__title">English puzzle</p>
      <div class="authorization-page_authorization-form">
        <div class="authorization-page_authorization-form__login">
          <p class="authorization-page_authorization-form__login__p">Email</p>
          <input type="email" class="authorization-page_authorization-form__login__input">
        </div>
        <div class="authorization-page_authorization-form__password">
          <p class="authorization-page_authorization-form__password__p">Password</p>
          <input class="authorization-page_authorization-form__password__input">
        </div>
      </div>
      <div class="authorization-page__btns">
        <button class="authorization-page__btns__registration">Registration</button>
        <button class="authorization-page__btns__log-in">Log In</button>
      </div>
    </div>
    <div class="notice-block" style = "display:none">
      <p class="notice-block__description"></p>
      <p class="notice-block__description"></p>
    </div>`
)
