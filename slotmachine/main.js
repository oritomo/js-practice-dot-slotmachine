'use strict';
{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      //thisがついている理由としては他のメソッドから呼び出すため
      this.img = document.createElement('img');//thisはPanelを指している

      //img.srcをgetRandomImage()メソッドにしている
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');

      
      this.stop.addEventListener('click', () => {
        //inactiveクラスがついていたらリターン
        if (this.stop.classList.contains('inactive')) {
          return;
        }

        //ついていなかったらspinメソッドの停止
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        //stopを押すたびにpanelsLeftを1減らす
        panelsLeft--;

        //panelsLeftが0になったら（＝スロットを全部押したら）inactiveを外し、panelsLeftを3にも戻しcheckResult()関数を発火
        if (panelsLeft === 0) {
          spin.classList.remove('inactive');
          panelsLeft = 3;
          checkResult();
        }
      });


      //要素の作成と子供の追加
      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    //スロットの写真をランダムで選ぶ処理
    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
        //'img/asa_oetsu_eduku.png',
        //'img/kasa_golf.png',
        //'img/mukiryoku_obasan.png',
      ];
      //images配列の何番目を出すかをランダム化
      return images[Math.floor(Math.random() * images.length)];
    }

    //imgのsrcをthis.getRandomImage()にして100ミリ秒間隔でspinメソッドを発火(＝再帰関数？)
    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 100)
    }

    //this.img.srcと引数で渡されてきたp1,p2が異なるかどうか判定
    isUnmatched(p1, p2) {
      // if(this.img.src!==p1.img.src &&  this.img.src !==p2.img.src){
      //   return true;
      // }else{
      //   return false;
      // }
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
      confirm('残念！')
    }

    ismatched(p1,p2){
      return this.img.src === p1.img.src && this.img.src === p2.img.src;
    }
    match(){
      confirm('おめでとう');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }

    if(panels[0].ismatched(panels[1],panels[2])){
      panels[0].match();
    }
    // if(panels[1].ismatched(panels[0],panels[2])){
    //   panels[1].match();
    // }
    // if(panels[2].ismatched(panels[0],panels[1])){
    //   panels[2].match();
    //}
  }

  //Panelクラスのインスタンス化
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  //panelsLeftの初期設定
  let panelsLeft = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
      panel.activate();
      panel.spin();//このpanelはどこから出てきた？←foreachのpanelやで
    });
  });
}