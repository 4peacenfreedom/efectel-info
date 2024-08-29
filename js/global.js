import { ObtenerDatosConfiguracion } from "/js/servicios_config.js";

export const MostrarHTML = async () => {
  const Datos = await ObtenerDatosConfiguracion();

  if (Datos) {
    let navbar = (document.getElementById("top-bar").innerHTML = CrearNavbar(
      Datos.navbar
    ));
    let herobanner = (document.getElementById("heroBanner").innerHTML =
      CrearHeroBanner(Datos.herobanner));
    let footer = (document.getElementById("Footer").innerHTML = CrearFooter(
      Datos.footer
    ));
  }
};

//0-Navbar

const CrearNavbar = (data) => {
  let html = `<div class="container-fluid">
        <div class="row justify-content-between no-gutters">
          <div class="col-auto side-col d-flex align-items-center text-nowrap">
            <!-- start navigation-toggle -->
            <a
              href="#"
              id="top-bar__navigation-toggler"
              class="hide-object-desktop"
            >
              <span></span>
            </a>
            <!-- end navigation-toggle -->
            <!-- start logo -->
            <a href="index.html" class="top-bar__logo">Efectel</a>
            <!-- end logo -->
          </div>
          <div class="col-auto">
            <!-- start desktop menu -->
            <nav id="top-bar__navigation">
              <ul>`;

  data.forEach((element) => {
    html += ` <li class="${element.claseDeCss}"><a class="nav-link" href="${element.enlace}">${element.nombre}</a></li>`;
  });

  html += `</ul>
            </nav>
            <!-- end desktop menu -->
          </div>
          <div class="col-auto side-col">
            <a href="tel:+50641150109" class="top-bar__custom-btn"
              ><span>LLAMANOS</span></a
            >
            <!-- end custom btn -->
          </div>
        </div>
      </div>`;

  return html;
};

// 1-Hero banner

const CrearHeroBanner = () => {
  let html = `
        <div class="mainSlider-layout">
          <div class="loading-content"></div>
          <div
            class="mainSlider mainSlider-size-02 slick-nav-02"
            data-arrow="true"
            data-dots="true"
          >
            <!-- PRIMER SLIDE -->
            <div class="slide">
              <div
                class="img--holder"
                data-bg="images/main-slider/02/mujer_callcenter.jpg"
              ></div>
              <div class="slide-content">
                <div
                  class="container"
                  data-animation="fadeInRightSm"
                  data-animation-delay="0s"
                >
                  <div class="slide-layout-03 text-left">
                    <img
                      class="slide-icon"
                      src="images/main-slider/01/main-slider-01-wrapper.png"
                      alt=""
                    />
                    <div class="slide-subtitle">Efectel</div>
                    <div class="slide-title">Centro de<br />Llamadas</div>
                    <div class="slide-description">
                      Contact Center en Costa Rica Ventas & Cobranza
                    </div>
                    <a class="btn-link-icon btn-link-icon__md" href="#">
                      <i class="btn__icon">
                        <svg><use xlink:href="#arrow_right"></use></svg>
                      </i>
                      <span class="btn__text">CONTACTANOS</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- SEGUNDO SLIDE -->
            <div class="slide">
              <div
                class="img--holder"
                data-bg="images/main-slider/02/slider-02.jpg"
              ></div>
              <div class="slide-content">
                <div
                  class="container"
                  data-animation="fadeInUpSm"
                  data-animation-delay="0s"
                >
                  <div class="slide-layout-02 text-center">
                    <div class="slide-subtitle">Efectel</div>
                    <div class="slide-title">Personal capacitado</div>
                    <div class="slide-description">
                      Ofrecemos entrenamiento y personal altamente capacitados
                    </div>
                    <a class="btn-link-icon btn-link-icon__md" href="#">
                      <i class="btn__icon">
                        <svg><use xlink:href="#arrow_right"></use></svg>
                      </i>
                      <span class="btn__text">CONTACTANOS</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- TERCER SLIDE -->
            <div class="slide">
              <div
                class="img--holder"
                data-bg="images/main-slider/02/slider-03.jpg"
              ></div>
              <div class="slide-content">
                <div
                  class="container"
                  data-animation="fadeInRightSm"
                  data-animation-delay="0s"
                >
                  <div class="slide-layout-03 text-right">
                    <img
                      class="slide-icon"
                      src="images/main-slider/01/main-slider-03-wrapper.png"
                      alt=""
                    />
                    <div class="slide-subtitle">Efectel</div>
                    <div class="slide-title">Equipos de<br />Calidad</div>
                    <div class="slide-description">
                      Tiempos de repuesta al 99% 24/7
                    </div>
                    <a class="btn-link-icon btn-link-icon__md" href="#">
                      <i class="btn__icon">
                        <svg><use xlink:href="#arrow_right"></use></svg>
                      </i>
                      <span class="btn__text">Llámanos</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="mainSlider-nav"></div>
          <ul class="mainSlider-social-icon">
            <li>
              <a href="https://www.facebook.com/efectel">
                <svg width="6" height="12">
                  <use xlink:href="#f"></use>
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <svg width="14" height="14">
                  <use xlink:href="#insta"></use>
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <svg width="13" height="11">
                  <use xlink:href="#in"></use>
                </svg>
              </a>
            </li>
          </ul>
          <div class="mainSlider-box02">
            <div class="container container-fluid-lg-nogutters">
              <div class="wrapper-col">
                <div class="mainSlider-box02__layout">
                  <address>Alajuela Centro, Costa Rica<br /></address>
                  <address>
                    <a href="tel:+50641150109">+506 4115-0109</a><br />
                    <a href="mailto:info@efectel.com">info@efectel.com</a>
                  </address>
                </div>
                <div class="mainSlider-box02-video">
                  <img src="images/main-slider/logo_color.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
            `;

  return html;
};

//2- Footer
const CrearFooter = (data) => {
  let html = `
      
        <h3>Derechos de Autor de NoticiasTecnológicas</h3>
        <p>Sigue a NoticiasTecnológicas</p>
        <ul class="list-inline enlaces-pie" id="ListaFooter">
            `;
  data.forEach((element) => {
    html += `<a href="${element.enlace}" class="mx-2"><i class="${element.claseDeCss}"> ${element.nombre}</i></a>`;
  });

  html += ` </ul>`;

  return html;
};
