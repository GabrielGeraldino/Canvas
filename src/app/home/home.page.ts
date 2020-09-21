import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  canvas: any;
  images = ['../assets/uniportPlanter11.jpg', '../assets/uniportPlanter12.jpg', '../assets/uniportPlanter13.jpg', '../assets/uniportPlanter14.jpg', '../assets/uniportPlanter15.jpg'];
  src: string;
  JlogoSrc = '../assets/jactoLogo.png';
  JlogoSrcNegative = '../assets/jacto-negative.png';
  logo: string;
  coverFilename: string;
  ratio: number;
  mainPosition = 'center';
  logoPositions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  desc: string;
  coverLoaded: boolean;

  verticalText = 3570;
  horizontalText = 2380;

  imgesLoaded = false; // verifica se as imagens foram carregadas para mostrar o divider
  completeDrawer = false;

  descPosition: string;
  descColor: string;

  imageColor: any;

  instagram = true;
  facebook = true;
  twitter = true;
  youtube = true;
  fontColor: string;

  imagesOptions = {
    direction: 'horizontal',
    slidesPerView: 4.3,
    freeMode: true,
    spaceBetween: 0.2
  };

  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  }

  ionViewWillEnter() {
    this.drawImage();
    this.imgesLoaded = true;
  }

  async drawImage(position = 0, clearAll = true) {

    await this.sharedService.showLoading('Estamos montando sua imagem');

    this.completeDrawer = true;

    const stageCtx = this.canvas.getContext('2d');

    stageCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const canvases = [];
    document.getElementsByName('CPreview').forEach(element => {
      canvases.push(element as HTMLCanvasElement);
    });

    const img = new Image();

    img.src = this.src;

    img.onload = async () => {
      console.log('drawImage.onload');
      if (img.width > this.canvas.width) {
        this.ratio = this.canvas.width / img.width;

      } else if (img.height > this.canvas.height) {
        this.ratio = this.canvas.height / img.height;
      }

      this.canvas.width = img.width;
      this.canvas.height = img.height;

      stageCtx.drawImage(
        img, 0, 0, this.canvas.width, this.canvas.height
      );

      this.addJLogo(stageCtx);
      this.addLogo(stageCtx, this.mainPosition);
      ///////////////////////////////////////////////////////////
      canvases.forEach(async (c, key) => {

        if (clearAll === true || key === (position - 1)) {

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
          // this.addJLogo(Ctx);
          this.addLogo(Ctx, this.logoPositions[canvases.indexOf(c)]);
        }

      });
    };

    this.sharedService.dismissLoading();
  }


  addJLogo(stageCtx: any) {
    const logo = new Image();
    // const color = this.getAverageRGB(stageCtx);
    let logoRatio = 1;
    logo.src = (((this.imageColor.r * 299) + (this.imageColor.g * 587) + (this.imageColor.b * 114)) / 1000) >= 128 ? this.JlogoSrc : this.JlogoSrcNegative;


    logo.onload = () => {
      if (logo.width < this.canvas.width) {
        logoRatio = this.canvas.width / (logo.width * 5);

      } else if (logo.height < this.canvas.height) {
        logoRatio = this.canvas.height / (logo.height * 5);
      }


      logo.width = logo.width * (logoRatio);
      logo.height = logo.height * (logoRatio);

      stageCtx.drawImage(logo, (this.canvas.width - (logo.width + 300)), 300, logo.width, logo.height);
    };
  }

  getAverageRGB(context: any) {

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
            horizontalP = ((this.canvas.width - this.canvas.width / 4) - (logo.width / 2));
            verticalP = (this.canvas.height / 4 - (logo.height / 2));
            break;
          case 'top-left':
            horizontalP = (this.canvas.width / 4 - (logo.width / 2));
            verticalP = (this.canvas.height / 4 - (logo.height / 2));
            break;
          case 'bottom-right':
            horizontalP = ((this.canvas.width - this.canvas.width / 4) - (logo.width / 2));
            verticalP = ((this.canvas.height - this.canvas.height / 4) - (logo.height / 2));
            break;
          case 'bottom-left':
            horizontalP = (this.canvas.width / 4 - (logo.width / 2));
            verticalP = ((this.canvas.height - this.canvas.height / 4) - (logo.height / 2));
            break;
        }
        stageCtx.drawImage(logo, horizontalP, verticalP, logo.width, logo.height);

        this.addDesc(stageCtx, [position, horizontalP, verticalP, logo.height]);
      };
    }

  }

  addDesc(Ctx, logoP: any[] = []) {
    let horizontalP: number;
    let verticalP: number;

    Ctx.fillStyle = this.fontColor;
    Ctx.font = '250px Calibri';
    Ctx.textAlign = 'center';

    if (this.descPosition === logoP[0]) {
      horizontalP = logoP[1];
      verticalP = logoP[2];
      const logoHeight = logoP[3];

      switch (this.descPosition) {
        case 'center':
          verticalP = (this.canvas.height / 2);
          Ctx.fillText(this.desc, this.canvas.width / 2, verticalP + (logoHeight * 0.9));
          break;
        case 'top-right':
          horizontalP = ((this.canvas.width - this.canvas.width / 5) - (logoHeight / 2));
          Ctx.fillText(this.desc, horizontalP, verticalP + (logoHeight * 1.4));
          break;
        case 'top-left':
          horizontalP = (this.canvas.width / 4);
          Ctx.fillText(this.desc, horizontalP, verticalP + (logoHeight * 1.4));
          break;
        case 'bottom-right':
          horizontalP = ((this.canvas.width - this.canvas.width / 5) - (logoHeight / 2));
          Ctx.fillText(this.desc, horizontalP, verticalP + (logoHeight * 1.4));
          break;
        case 'bottom-left':
          horizontalP = (this.canvas.width / 4);
          Ctx.fillText(this.desc, horizontalP, verticalP + (logoHeight * 1.4));
          break;
      }
    } else {
      switch (this.descPosition) {
        case 'center':
          horizontalP = (this.canvas.width / 2);
          verticalP = (this.canvas.height / 2);
          Ctx.fillText(this.desc, horizontalP, verticalP);
          break;
        case 'top-right':
          horizontalP = ((this.canvas.width - this.canvas.width / 4));
          verticalP = (this.canvas.height / 4);
          Ctx.fillText(this.desc, horizontalP, verticalP);
          break;
        case 'top-left':
          horizontalP = (this.canvas.width / 4);
          verticalP = (this.canvas.height / 4);
          Ctx.fillText(this.desc, horizontalP, verticalP);
          break;
        case 'bottom-right':
          horizontalP = ((this.canvas.width - this.canvas.width / 4));
          verticalP = ((this.canvas.height - this.canvas.height / 4));
          Ctx.fillText(this.desc, horizontalP, verticalP);
          break;
        case 'bottom-left':
          horizontalP = (this.canvas.width / 4);
          verticalP = ((this.canvas.height - this.canvas.height / 4));
          Ctx.fillText(this.desc, horizontalP, verticalP);
          break;
      }

    }
  }

  verticalAdd() {
    this.verticalText += 10;
    const stageCtx = this.canvas.getContext('2d');
    stageCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    stageCtx.fillText(this.desc, this.horizontalText, this.verticalText);
  }

  changeMainframe(e: any) {
    this.mainPosition = this.logoPositions.splice(e.target.id - 1, e.target.id, this.mainPosition).toString();
    this.drawImage(e.target.id, false);
  }

  changeDescPos() {
    this.drawImage(0, true);
  }

  clearText() {
    const stageCtx = this.canvas.getContext('2d');
    stageCtx.restore();
  }

  changeImg(index: number) {
    this.src = this.images[index];
    this.imageColor = this.getAverageRGB(this.canvas.getContext('2d'));
  }

  inputResaleLogo(event: any) {
    this.coverFilename = /[.]/.exec(event.target.value) ? `.${/[^.]+$/.exec(event.target.value)}` : '';
    if (this.sharedService.checkImg(this.coverFilename)) {
      const reader = new FileReader();
      reader.onload = (imageToLoad: any) => {
        this.logo = imageToLoad.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.coverLoaded = true;

      return this.logo;
    }
  }

  async download() {
    const url = this.canvas.toDataURL('image/jpg');
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'todo-1.jpg';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async resize() {
    this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const context = this.canvas.getContext('2d');
    // context.strokeRect(0, 0, 100, 100);
    // const imgwidth = sourceimage.offsetWidth;
    // const imgheight = sourceimage.offsetHeight;
    context.drawImage(
      this.canvas, 0, 0, 1, 1
    );

    await this.download();

  }

}
