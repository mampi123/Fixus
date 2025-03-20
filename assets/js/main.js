/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Becool - Onepage Multipurpose Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
    "use strict";

    $(document).on('ready', function() {


        /* ==================================================
            # Wow Init
         ===============================================*/
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();

        /* ==================================================
            # Smooth Scroll
         ===============================================*/
        $("body").scrollspy({
            target: ".navbar-collapse",
            offset: 200
        });
        $('a.smooth-menu').on('click', function(event) {
            var $anchor = $(this);
            var headerH = '75';
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });

        /* ==================================================
            # Banner Animation
         ===============================================*/
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $immortalCarousel = $('.animate_text'),
            $firstAnimatingElems = $immortalCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $immortalCarousel.carousel();
        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Other slides to be animated on carousel slide event
        $immortalCarousel.on('slide.bs.carousel', function(e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });

        /* ==================================================
            # Youtube Video Init
         ===============================================*/
        $('.player').mb_YTPlayer();


        /* ==================================================
            # Equal Height Init
        ===============================================*/
        $(window).on('resize', function() {
            $(".equal-height").equalHeights();
        });

        $(".equal-height").equalHeights().find("img, iframe, object").on('load', function() {
            $(".equal-height").equalHeights();
        });

        /* ==================================================
            # Typed Text Init Init
        ===============================================*/
        $(".element").typed({
            strings: ["Professional Photographer", "Expert in wedding photography", "10+ years experiance"],
            typeSpeed: 10,
            loop: true,
            backDelay: 2000
        });


        /* ==================================================
            # Ripple Effect
        ===============================================*/
        jQuery('#ripple').ripples({
            resolution: 300,
            dropRadius: 20,
            perturbance: 0.04
        });


        /* ==================================================
            # imagesLoaded active
        ===============================================*/
        $('#portfolio-grid,.blog-masonry').imagesLoaded(function() {

            /* Filter menu */
            $('.mix-item-menu').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });

            /* filter menu active class  */
            $('.mix-item-menu button').on('click', function(event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

            /* Filter active */
            var $grid = $('#portfolio-grid').isotope({
                itemSelector: '.pf-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.pf-item',
                }
            });

            /* Filter active */
            $('.blog-masonry').isotope({
                itemSelector: '.blog-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.blog-item',
                }
            });

        });


        /* ==================================================
            # Magnific popup init
         ===============================================*/
        $(".popup-link").magnificPopup({
            type: 'image',
            // other options
        });

        $(".popup-gallery").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            // other options
        });

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.magnific-mix-gallery').each(function() {
            var $container = $(this);
            var $imageLinks = $container.find('.item');

            var items = [];
            $imageLinks.each(function() {
                var $item = $(this);
                var type = 'image';
                if ($item.hasClass('magnific-iframe')) {
                    type = 'iframe';
                }
                var magItem = {
                    src: $item.attr('href'),
                    type: type
                };
                magItem.title = $item.data('title');
                items.push(magItem);
            });

            $imageLinks.magnificPopup({
                mainClass: 'mfp-fade',
                items: items,
                gallery: {
                    enabled: true,
                    tPrev: $(this).data('prev-text'),
                    tNext: $(this).data('next-text')
                },
                type: 'image',
                callbacks: {
                    beforeOpen: function() {
                        var index = $imageLinks.index(this.st.el);
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    }
                }
            });
        });

        /* ==================================================
            # Team Carousel
         ===============================================*/
        $('.team-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        /* ==================================================
            # App Screnshoot Carousel
         ===============================================*/
        $('.screnshoot-items').owlCarousel({
            loop: false,
            margin: 30,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        });


        /* ==================================================
            # Testomonails Carousel
         ===============================================*/
        $('.testimonial-items').owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            autoplay: true,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });

        /* ==================================================
            # Services Carousel
         ===============================================*/
        $('.services-items.one-item').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            autoplay: true,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });

        /* ==================================================
            # Portfolio Carousel
         ===============================================*/
        $('.gallery-carousel').owlCarousel({
            loop: false,
            margin: 0,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });

        /* ==================================================
            # Team Carousel
         ===============================================*/
        $('.team-carousel').owlCarousel({
            loop: false,
            margin: 0,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        /* ==================================================
            # Services Carousel
         ===============================================*/
        $('.carousel-serivices').owlCarousel({
            loop: false,
            margin: 30,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        /* ==================================================
            # Work Step Carousel
         ===============================================*/
        $('.works-steps').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        /* ==================================================
            # About Carousel
         ===============================================*/
        $('.about-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        });


        /* ==================================================
            # Porfolio Banner Carousel
         ===============================================*/
        $('.pf-thum-carousel').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            autoplay: true,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });


        /* ==================================================
            # Related Projects Carousel
         ===============================================*/
        $('.prelated-project-items').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        
        /* ==================================================
            # Clients Carousel
         ===============================================*/
        $('.clients-items').owlCarousel({
            loop: false,
            margin: 20,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });


        /* ==================================================
            # Instagram Carousel
         ===============================================*/
        $('.ins-gallery-items').owlCarousel({
            loop: false,
            margin: 5,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });


        /* ==================================================
            # Fun Factor Init
        ===============================================*/
        $('.timer').countTo();
        $('.fun-fact').appear(function() {
            $('.timer').countTo();
        }, {
            accY: -100
        });


        /* ==================================================
            Preloader Init
         ===============================================*/
        $(window).on('load', function() {
            // Animate loader off screen
            $(".se-pre-con").fadeOut("slow");;
        });


        /* ==================================================
            Contact Form Validations
        ================================================== */
        $('.contact-form').each(function() {
            var formInstance = $(this);
            formInstance.submit(function() {

                var action = $(this).attr('action');

                $("#message").slideUp(750, function() {
                    $('#message').hide();

                    $('#submit')
                        .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
                        .attr('disabled', 'disabled');

                    $.post(action, {
                            name: $('#name').val(),
                            email: $('#email').val(),
                            phone: $('#phone').val(),
                            comments: $('#comments').val()
                        },
                        function(data) {
                            document.getElementById('message').innerHTML = data;
                            $('#message').slideDown('slow');
                            $('.contact-form img.loader').fadeOut('slow', function() {
                                $(this).remove()
                            });
                            $('#submit').removeAttr('disabled');
                        }
                    );
                });
                return false;
            });
        });

    }); // end document ready function
})(jQuery); // End jQuery



document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function (cc) {
if(cc.which == 85){
return false;
}
if(cc.which == 80){
return false;
}
}

$(document).ready(function(){
    $(".clientes-carousel").owlCarousel({
        loop: true,             // Hace que el carrusel sea infinito
        margin: 30,             // Espaciado entre los logos
        autoplay: true,         // Activa el autoplay
        autoplayTimeout: 2000,  // Tiempo entre cambios de logo (2s)
        autoplayHoverPause: true, // Pausa al pasar el mouse
        responsive: {
            0: { items: 2 },    // Muestra 2 logos en móviles
            600: { items: 3 },  // Muestra 3 logos en tablets
            1000: { items: 5 }  // Muestra 5 logos en pantallas grandes
        }
    });
});

$(document).ready(function () {
    var backToTop = $("#back-to-top");

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            backToTop.addClass("show");
        } else {
            backToTop.removeClass("show");
        }
    });

    backToTop.click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "smooth");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let services = document.querySelectorAll(".service-item");

    function revealServices() {
        let triggerBottom = window.innerHeight * 0.85;

        services.forEach(service => {
            let serviceTop = service.getBoundingClientRect().top;
            console.log("Elemento:", service, "Posición:", serviceTop, "Trigger:", triggerBottom); // Debugging

            if (serviceTop < triggerBottom) {
                service.classList.add("appear");
            }
        });
    }

    // Usar IntersectionObserver si el navegador lo soporta
    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("appear");
                    observer.unobserve(entry.target); // Deja de observar después de activarlo
                }
            });
        }, { threshold: 0.2 }); // Se activa cuando el 20% del elemento es visible

        services.forEach(service => observer.observe(service));
    } else {
        // Fallback para navegadores sin IntersectionObserver
        window.addEventListener("scroll", revealServices);
        revealServices(); // Ejecutar en la carga por si ya están visibles
    }
});

        document.addEventListener("DOMContentLoaded", function() {
            setTimeout(function() {
                document.getElementById("preloader").style.display = "none";
            }, 1000); // Se oculta después de 1 segundo
        });    


        $(document).ready(function(){
            $(".carousel-serivices").owlCarousel({
                loop: true,             // Hace que el carrusel sea infinito
                margin: 30,             // Espaciado entre los elementos
                autoplay: true,         // Activa el autoplay
                autoplayTimeout: 3000,  // Tiempo entre cambios (3s)
                autoplayHoverPause: true, // Pausa al pasar el mouse
                nav: true,              // Habilita las flechas de navegación
                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"], // Iconos de flechas
                responsive: {
                    0: { items: 1 },    
                    600: { items: 2 },  
                    1000: { items: 3 }  
                }
            });
        });
        

        
        document.addEventListener("DOMContentLoaded", () => {
            const faqQuestions = document.querySelectorAll(".faq-question")
          
            faqQuestions.forEach((question) => {
              question.addEventListener("click", () => {
                const answer = question.nextElementSibling
                const isActive = question.classList.contains("active")
          
                // Cerrar todas las respuestas abiertas
                faqQuestions.forEach((q) => {
                  q.classList.remove("active")
                  q.nextElementSibling.classList.remove("active")
                })
          
                // Abrir o cerrar la respuesta actual
                if (!isActive) {
                  question.classList.add("active")
                  answer.classList.add("active")
                }
              })
            })
          })
          
          document.querySelectorAll('.flip-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.member-card');
                card.classList.add('flipped');
            });
        });

        document.querySelectorAll('.flip-button-back').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.member-card');
                card.classList.remove('flipped');
            });
        });
 
        document.addEventListener("DOMContentLoaded", function () {
            const serviceCards = document.querySelectorAll(".service-card");
        
            serviceCards.forEach((card) => {
                const flipButton = card.querySelector(".flip-button");
                const flipBackButton = card.querySelector(".flip-button-back");
        
                flipButton.addEventListener("click", () => {
                    card.classList.add("flipped");
                });
        
                flipBackButton.addEventListener("click", () => {
                    card.classList.remove("flipped");
                });
            });
        });

        document.addEventListener("DOMContentLoaded", function () {
            const faqItems = document.querySelectorAll(".faq-item");
        
            faqItems.forEach((item) => {
                const question = item.querySelector(".faq-question");
        
                question.addEventListener("click", () => {
                    // Cierra todas las preguntas antes de abrir la actual
                    faqItems.forEach((faq) => {
                        if (faq !== item) {
                            faq.classList.remove("active");
                        }
                    });
        
                    // Alternar la clase "active" en la pregunta seleccionada
                    item.classList.toggle("active");
                });
            });
        });
        
        // Ejecutar inmediatamente para asegurarnos de que se cargue antes que cualquier otro script
        (function() {
            // Función para mostrar notificaciones
            function showNotification(message, isSuccess) {
                // Eliminar notificaciones anteriores
                const existingNotifications = document.querySelectorAll('.notification');
                existingNotifications.forEach(notification => {
                    notification.remove();
                });
                
                // Crear el elemento de notificación
                const notification = document.createElement('div');
                notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
                
                // Icono según el tipo de mensaje
                const icon = isSuccess 
                    ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="notification-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
                    : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="notification-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
                
                // Estructura del mensaje
                notification.innerHTML = `
                    ${icon}
                    <span class="notification-message">${message || (isSuccess ? '✅ Correo enviado correctamente. Gracias por contactarnos.' : '❌ Error al enviar el correo. Por favor, intenta nuevamente.')}</span>
                `;
                
                // Añadir al DOM
                document.body.appendChild(notification);
                
                // Mostrar con animación
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                // Ocultar después de 5 segundos
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.classList.add('hide');
                    
                    // Eliminar del DOM después de la animación
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 5000);
            }

            // Función para manejar el envío del formulario
            function handleFormSubmit(form) {
                // Crear FormData con los datos del formulario
                const formData = new FormData(form);
                
                // Obtener el botón de envío
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                const originalText = submitButton ? submitButton.innerHTML : '';
                
                // Mostrar indicador de carga
                if (submitButton) {
                    submitButton.innerHTML = '<span class="spinner spinning"></span> Enviando...';
                    submitButton.disabled = true;
                }
                
                // Obtener la URL de acción del formulario
                const actionUrl = form.getAttribute('action') || 'contact-Er0HugLK6XyBZnBEGKhDuxl6GDfOlO.php';
                
                // Enviar los datos al archivo PHP
                fetch(actionUrl, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    // Restaurar el botón
                    if (submitButton) {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }
                    
                    // Extraer el mensaje del HTML devuelto
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const messageElement = doc.getElementById('response-message');
                    const message = messageElement ? messageElement.textContent : '';
                    const isSuccess = data.includes('alert-success') || data.includes('Correo enviado correctamente');
                    
                    // Mostrar la notificación
                    showNotification(message, isSuccess);
                    
                    // Limpiar el formulario si fue exitoso
                    if (isSuccess) {
                        form.reset();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // Restaurar el botón
                    if (submitButton) {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }
                    
                    // Mostrar mensaje de error
                    showNotification('❌ Error al enviar el correo. Por favor, intenta nuevamente.', false);
                });
            }

            // Función para inicializar los manejadores de eventos
            function initFormHandlers() {
                // Buscar todos los formularios en la página
                const forms = document.querySelectorAll('form');
                
                forms.forEach(form => {
                    // Eliminar cualquier manejador de eventos existente
                    const newForm = form.cloneNode(true);
                    form.parentNode.replaceChild(newForm, form);
                    
                    // Añadir nuestro manejador de eventos
                    newForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFormSubmit(this);
                        return false;
                    }, true);
                    
                    // Modificar el atributo onsubmit para mayor seguridad
                    newForm.setAttribute('onsubmit', 'return false;');
                    
                    // Eliminar el atributo target si existe
                    if (newForm.hasAttribute('target')) {
                        newForm.removeAttribute('target');
                    }
                });
            }

            // Inicializar cuando el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initFormHandlers);
            } else {
                initFormHandlers();
            }

            // También inicializar después de que la página se cargue completamente
            window.addEventListener('load', initFormHandlers);
            
            // Reinicializar periódicamente para capturar formularios añadidos dinámicamente
            setInterval(initFormHandlers, 2000);
        })();

        $(document).ready(() => {
            // Iconos SVG para los mensajes
            const successIcon =
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="message-icon"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>'
          
            const errorIcon =
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="message-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
          
            // Cuando se envíe el formulario
            $("#contact-form").submit(function (e) {
              e.preventDefault() // Prevenir que el formulario se envíe de manera tradicional
          
              // Obtener los datos del formulario
              var formData = $(this).serialize()
          
              // Cambiar el texto del botón y deshabilitarlo durante el envío
              $("#submit-btn").text("Enviando...").prop("disabled", true)
          
              // Limpiar mensajes anteriores
              $("#response-message").empty()
          
              // Realizar la solicitud AJAX
              $.ajax({
                type: "POST",
                url: "process.php", // Ruta a tu archivo PHP
                data: formData,
                dataType: "json",
                success: (response) => {
                  // Mostrar el mensaje de respuesta en la página
                  if (response.status === "success") {
                    $("#response-message").html(
                      `<div class="message message-success">
                                      ${successIcon}
                                      <div class="message-content">${response.message}</div>
                                  </div>`,
                    )
          
                    // Limpiar el formulario en caso de éxito
                    $("#contact-form")[0].reset()
                  } else {
                    $("#response-message").html(
                      `<div class="message message-error">
                                      ${errorIcon}
                                      <div class="message-content">${response.message}</div>
                                  </div>`,
                    )
                  }
                },
                error: () => {
                  $("#response-message").html(
                    `<div class="message message-error">
                                  ${errorIcon}
                                  <div class="message-content">Ha ocurrido un error inesperado. Por favor, inténtelo nuevamente más tarde o utilice un método alternativo de contacto.</div>
                              </div>`,
                  )
                },
                complete: () => {
                  // Restaurar el botón
                  $("#submit-btn").text("Enviar").prop("disabled", false)
                },
              })
            })
          })
          
          