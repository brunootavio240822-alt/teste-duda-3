
/* ELEMENTOS */

const inicio = document.getElementById("inicio");
const modal = document.getElementById("modal");
const surpresa = document.getElementById("surpresa");
const player = document.getElementById("player");

const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");
const btnContinuar = document.getElementById("btnContinuar");

const audio = document.getElementById("audio");
const nomeMusica = document.getElementById("nomeMusica");

const playPause = document.getElementById("playPause");
const anterior = document.getElementById("anterior");
const proxima = document.getElementById("proxima");


/* BOTÃO SIM */

btnSim.addEventListener("click", () => {
    modal.classList.remove("escondido");
});


/* BOTÃO NÃO */

let tamanhoBotaoNao = 1;

btnNao.addEventListener("click", () => {
    btnNao.textContent = "TEM CERTEZA?";

    tamanhoBotaoNao -= 0.08;

    if (tamanhoBotaoNao < 0.5) {
        tamanhoBotaoNao = 0.5;
    }

    btnNao.style.transform = `scale(${tamanhoBotaoNao})`;
});


/* CONTINUAR */

btnContinuar.addEventListener("click", () => {
    inicio.classList.add("escondido");
    modal.classList.add("escondido");

    surpresa.classList.remove("escondido");
    player.classList.remove("escondido");

    configurarVideos();

    observarElementos();

    iniciarMusica();
});


/* PLAYLIST */

const playlist = [
    {
        nome: "Still Loving You - Scorpions",
        arquivo: "audio/musica1.mp3"
    },
    {
        nome: "Livin' on a Prayer - Bon Jovi",
        arquivo: "audio/musica2.mp3"
    },
    {
        nome: "Creep - Radiohead",
        arquivo: "audio/musica3.mp3"
    }
];

let musicaAtual = 0;


/* CARREGAR MÚSICA */

function carregarMusica(indice) {
    musicaAtual = (indice + playlist.length) % playlist.length;

    audio.src = playlist[musicaAtual].arquivo;
    nomeMusica.textContent = playlist[musicaAtual].nome;
}


/* INICIAR MÚSICA */

function iniciarMusica() {
    carregarMusica(0);

    audio.volume = 0.7;

    audio.play()
        .then(() => {
            playPause.textContent = "❚❚";
        })
        .catch(() => {
            playPause.textContent = "▶";
            nomeMusica.textContent =
                playlist[musicaAtual].nome + " — toque em ▶ para ouvir";
        });
}


/* PLAY / PAUSE */

playPause.addEventListener("click", () => {
    if (audio.paused) {
        audio.play()
            .then(() => {
                playPause.textContent = "❚❚";
            })
            .catch(() => {
                playPause.textContent = "▶";
            });
    } else {
        audio.pause();
        playPause.textContent = "▶";
    }
});


/* MÚSICA ANTERIOR */

anterior.addEventListener("click", () => {
    carregarMusica(musicaAtual - 1);

    audio.play()
        .then(() => {
            playPause.textContent = "❚❚";
        })
        .catch(() => {
            playPause.textContent = "▶";
        });
});


/* PRÓXIMA MÚSICA */

proxima.addEventListener("click", () => {
    carregarMusica(musicaAtual + 1);

    audio.play()
        .then(() => {
            playPause.textContent = "❚❚";
        })
        .catch(() => {
            playPause.textContent = "▶";
        });
});


/* AVANÇAR AUTOMATICAMENTE NA PLAYLIST */

audio.addEventListener("ended", () => {
    carregarMusica(musicaAtual + 1);

    audio.play()
        .then(() => {
            playPause.textContent = "❚❚";
        })
        .catch(() => {
            playPause.textContent = "▶";
        });
});


/* CONFIGURAÇÃO DOS VÍDEOS */

function configurarVideos() {
    const videos = document.querySelectorAll(".videos-container video");

    videos.forEach((video) => {
        video.muted = true;
        video.defaultMuted = true;
        video.playbackRate = 0.7;
        video.playsInline = true;

        video.addEventListener("loadedmetadata", () => {
            video.playbackRate = 0.7;
        });

        video.addEventListener("play", () => {
            video.muted = true;
            video.playbackRate = 0.7;

            videos.forEach((outroVideo) => {
                if (outroVideo !== video) {
                    outroVideo.pause();
                }
            });
        });

        video.addEventListener("volumechange", () => {
            if (!video.muted) {
                video.muted = true;
            }
        });
    });
}


/* ANIMAÇÃO DE APARECIMENTO */

function observarElementos() {
    const elementos = document.querySelectorAll(
        ".mensagem, .fotos, .videos, footer"
    );

    if (!("IntersectionObserver" in window)) {
        elementos.forEach((elemento) => {
            elemento.style.opacity = "1";
        });
        return;
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach((elemento) => {
        elemento.classList.add("revelar");
        observador.observe(elemento);
    });
}
