export const mainPageHeaderNode = (
  `
      <div class="main-page__control-block">
        <div class="main-page__control-block__switch-level">
          <p class="main-page__control-block__switch-level__title">Level</p>
          <select class="main-page__control-block__switch-level__select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
          <p class="main-page__control-block__switch-level__title">Page</p>
          <select class="main-page__control-block__switch-level__select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
            <option>46</option>
            <option>47</option>
            <option>48</option>
            <option>49</option>
            <option>50</option>
            <option>51</option>
            <option>52</option>
            <option>53</option>
            <option>54</option>
            <option>55</option>
            <option>56</option>
            <option>57</option>
            <option>58</option>
            <option>59</option>
            <option>60</option>
          </select>
      </div>
        <div class="main-page__control-block__hints">
          <button class="main-page__control-block__hints__audio-begin"></button>
          <button class="main-page__control-block__hints__translate"></button>
          <button class="main-page__control-block__hints__audio-repeat"></button>
          <button class="main-page__control-block__hints__background"></button>
        </div>
      </div>
      <div class="main-page__active-hints">
        <div></div>
        <p class="main-page__active-hints__translate"></p>
      </div>
    `
);

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
);

export const mainPageResultBlockNode = (
  '<div class="main-page__result-block"></div>'
);

export const mainPageButtonsBlockNode = (
  `   <div class="main-page__buttons">
        <button class="main-page__buttons__check">Check</button>
        <button class="main-page__buttons__dnt-know">I don't know</button>
      </div>`
);

export const nodeAuthorizationPage = (
  `<div class="authorization-page">
  <div class="authorization-page__wrapper">
      <p class="authorization-page__title">English puzzle</p>
      <div class="authorization-page_authorization-form">
        <div class="authorization-page_authorization-form__login">
          <p class="authorization-page_authorization-form__login__p">Email</p>
          <input type="email" class="authorization-page_authorization-form__login__input">
        </div>
        <div class="authorization-page_authorization-form__password">
          <p class="authorization-page_authorization-form__password__p">Password</p>
          <input type ="password" class="authorization-page_authorization-form__password__input">
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
      </div>
      <div class="start-block">
        <h1>English puzzle</h1>
        <p class="start-block__description">Click on words, collect phrases</p>
        <p class="start-block__description">Words can be drag and drop. Select tooltips in the menu</p>
        <button class="start-block__btn">Start</button>
      </div>
    </div>`
);
