// Função para gerar senha
function gerarSenha(tamanho, complexidade) {
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const caracteresEspeciais = '!@#$%^&*()_+[]{}|;:,.<>?';

    let caracteres = letrasMinusculas;

    if (complexidade >= 2) {
        caracteres += letrasMaiusculas;
    }

    if (complexidade >= 3) {
        caracteres += numeros;
    }

    if (complexidade == 4) {
        caracteres += caracteresEspeciais;
    }

    let senha = '';

    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    return senha;
}

// Evento para gerar a senha
document.getElementById('gerar').addEventListener('click', function () {
    const tamanho = parseInt(document.getElementById('tamanho').value);
    const complexidade = parseInt(document.getElementById('complexidade').value);

    if (tamanho < 4) {
        alert("O tamanho mínimo da senha é 4.");
        return;
    }

    const senhaGerada = gerarSenha(tamanho, complexidade);
    document.getElementById('senha').textContent = senhaGerada; // Exibe a senha gerada
});

// Função para copiar a senha para a área de transferência
function copiarSenha() {
    const senhaTexto = document.getElementById('senha').textContent;

    console.log("Senha gerada:", senhaTexto); // Para verificar se a senha está sendo lida corretamente

    if (!senhaTexto) {
        alert('Nenhuma senha para copiar.');
        return;
    }

    navigator.clipboard.writeText(senhaTexto)
        .then(() => alert('Senha copiada para a área de transferência!'))
        .catch(err => console.error('Erro ao copiar senha:', err));
}

// Adicionando evento ao botão de copiar
document.getElementById('salvar').addEventListener('click', copiarSenha);

// Cache e service worker
const cacheName = 'pwa-cache-v1'; // Defina o nome do cache

const cacheFiles = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).then((fetchResponse) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(e.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => caches.match('/index.html'))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).then((fetchResponse) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(e.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => caches.match('/index.html'))
  );
});

console.log("O script.js foi carregado corretamente!");
const CACHE_NAME = "app-cache-v2"; // Mude o nome do cache para forçar atualização
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",  // Certifique-se de que o CSS está listado aqui
    "/app.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Limpando cache antigo:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
