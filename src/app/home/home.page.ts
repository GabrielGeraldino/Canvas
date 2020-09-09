import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  canvas: any;
  src = '../assets/canvasTest.jpg';
  JlogoSrc = '../assets/jactoLogo.png';
  JlogoSrcNegative = '../assets/JactoLogoNegative.png';
  logo = '../assets/copercitrus.png';
  ratio: number;
  mainPosition = 'center';
  positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  desc: string;

  verticalText = 3570;
  horizontalText = 2380;

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  }

  ionViewWillEnter() {
    this.drawImage();
    // this.addDesc('szdfhnaiuofhbauiohbfuioajhbfiouahuifaghuifahsduifgasyiu')
  }

  drawImage() {
    const stageCtx = this.canvas.getContext('2d');

    stageCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const canvases = [];
    document.getElementsByName('CPreview').forEach(element => {
      canvases.push(element as HTMLCanvasElement);
    });

    const img = new Image();

    img.src = this.src;

    img.onload = async () => {
      if (img.width > this.canvas.width) {
        this.ratio = this.canvas.width / img.width;

      } else if (img.height > this.canvas.height) {
        this.ratio = this.canvas.height / img.height;
      }
      // const oc = document.createElement('canvas');
      // const octx = oc.getContext('2d');

      // oc.width = img.width;
      // oc.height = img.height;

      // octx.drawImage(img, 0, 0, oc.width, oc.height);

      this.canvas.width = img.width;
      this.canvas.height = img.height;

      stageCtx.drawImage(
        img, 0, 0, this.canvas.width, this.canvas.height
        // oc, 0, 0, oc.width, oc.height, 0, 0, this.canvas.width, this.canvas.height
      );

      this.addJLogo(stageCtx);
      this.addLogo(stageCtx, this.mainPosition);
      ///////////////////////////////////////////////////////////
      canvases.forEach(c => {
        const Ctx = c.getContext('2d');
        Ctx.clearRect(0, 0, c.width, c.height);
        let ratio: number;

        if (img.width > c.width) {
          ratio = c.width / img.width;

        } else if (img.height > c.height) {
          ratio = c.height / img.height;
        }

        c.width = img.width;
        c.height = img.height;

        Ctx.drawImage(
          img, 0, 0, c.width, c.height
        );
        this.addJLogo(Ctx);
        this.addLogo(Ctx, this.positions[canvases.indexOf(c)]);
      });
    };

  }


  addJLogo(stageCtx: any) {
    const logo = new Image();
    const color = this.getAverageRGB(stageCtx);
    let logoRatio = 1;
    logo.src = (((color.r * 299) + (color.g * 587) + (color.b * 114)) / 1000) >= 128 ? this.JlogoSrc : this.JlogoSrcNegative;


    logo.onload = () => {
      if (logo.width < this.canvas.width) {
        logoRatio = this.canvas.width / (logo.width * 5);

      } else if (logo.height < this.canvas.height) {
        logoRatio = this.canvas.height / (logo.height * 5);
      }


      logo.width = logo.width * (logoRatio);
      logo.height = logo.height * (logoRatio);

      stageCtx.drawImage(logo, (this.canvas.width - (logo.width + 50)), 0, logo.width, logo.height);
    };
  }

  getAverageRGB(context) {

    const blockSize = 5; // only visit every 5 pixels
    const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
    let data: any;
    let i = -4;
    let length: any;
    const rgb = { r: 0, g: 0, b: 0 };
    let count = 0;


    try {
      data = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    } catch (e) {
      /* security error, img on diff domain */
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

  }

  addLogo(stageCtx = null, position: string) {
    const logo = new Image();
    let logoRatio = 1;
    let horizontalP: number;
    let verticalP: number;

    if (stageCtx !== null) {
      logo.src = this.logo;

      logo.onload = () => {
        if (logo.width < this.canvas.width) {
          logoRatio = this.canvas.width / (logo.width * 3);

        } else if (logo.height < this.canvas.height) {
          logoRatio = this.canvas.height / (logo.height * 3);
        }


        logo.width = logo.width * (logoRatio);
        logo.height = logo.height * (logoRatio);

        switch (position) {
          case 'center':
            horizontalP = (this.canvas.width / 2 - (logo.width / 2));
            verticalP = (this.canvas.height / 2 - (logo.height / 2));
            break;
          case 'top-right':
            horizontalP = (this.canvas.width / 4 - (logo.width / 2));
            verticalP = (this.canvas.height / 4 - (logo.height / 2));
            break;
          case 'top-left':
            horizontalP = ((this.canvas.width - this.canvas.width / 4) - (logo.width / 2));
            verticalP = (this.canvas.height / 4 - (logo.height / 2));
            break;
          case 'bottom-right':
            horizontalP = (this.canvas.width / 4 - (logo.width / 2));
            verticalP = ((this.canvas.height - this.canvas.height / 4) - (logo.height / 2));
            break;
          case 'bottom-left':
            horizontalP = ((this.canvas.width - this.canvas.width / 4) - (logo.width / 2));
            verticalP = ((this.canvas.height - this.canvas.height / 4) - (logo.height / 2));
            break;
        }

        stageCtx.drawImage(logo, horizontalP, verticalP, logo.width, logo.height);
      };



    }

  }
  addDesc() {
    const stageCtx = this.canvas.getContext('2d');

    stageCtx.fillStyle = 'white';
    stageCtx.font = '500px Calibri';
    stageCtx.fillStyle = 'white';
    console.log('CANVAS WIDTH', this.canvas.width / 2);
    console.log('CANVAS HEIGTH', this.canvas.height / 2);


    console.log('THIS.VERTICAL', this.verticalText);
    console.log('THIS.HORIZONTAL', this.horizontalText);

    // this.desc !== undefined ? stageCtx.fillText(this.desc, this.canvas.width / 2, this.canvas.height / 2) : null;
    stageCtx.fillText(this.desc, this.horizontalText, this.verticalText);
  }

  verticalAdd() {
    this.verticalText += 10;
    const stageCtx = this.canvas.getContext('2d');
    stageCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    stageCtx.fillText(this.desc, this.horizontalText, this.verticalText);
  }


  changeMainframe(e: any) {
    this.mainPosition = this.positions.splice(e.target.id - 1, e.target.id - 1, this.mainPosition).toString();
    this.drawImage();
  }
}
