# Deploy no GitHub Pages

O projeto já está configurado para gerar e publicar a pasta `dist` automaticamente com GitHub Actions.

## 1. Criar o repositório

No GitHub, crie um repositório vazio. Não marque as opções para adicionar README, `.gitignore` ou licença.

## 2. Enviar o projeto

Abra o PowerShell na pasta do projeto e execute, substituindo `SEU_USUARIO` e `NOME_DO_REPOSITORIO`:

```powershell
git init
git branch -M main
git add .
git commit -m "Publica o Linktree"
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
git push -u origin main
```

## 3. Configurar a chave do Firebase

No repositório do GitHub:

1. Abra `Settings`.
2. Abra `Secrets and variables` e depois `Actions`.
3. Clique em `New repository secret`.
4. Use o nome `VITE_FIREBASE_API_KEY`.
5. Cole como valor a chave Web exibida em `Firebase Console > Configurações do projeto > Seus aplicativos`.

Variáveis do Vite com prefixo `VITE_` são incorporadas ao JavaScript final e podem ser vistas no navegador. A segurança dos dados deve ser garantida pelas regras do Firestore e pelo Firebase App Check.

## 4. Habilitar o GitHub Pages

No repositório do GitHub:

1. Abra `Settings`.
2. Abra `Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions` em `Source`.
4. Abra a aba `Actions` e aguarde o workflow `Deploy site to GitHub Pages` finalizar.

O endereço será:

```text
https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/
```

## 5. Autorizar o domínio no Firebase

No Firebase Console:

1. Abra `Authentication`.
2. Abra `Settings`.
3. Em `Authorized domains`, adicione `SEU_USUARIO.github.io`.

As regras publicadas do Firestore também precisam permitir leitura pública das coleções `links` e `social`, mantendo escrita restrita ao UID do administrador.

## Próximas atualizações

Depois do primeiro deploy, publique alterações com:

```powershell
git add .
git commit -m "Descreva a alteração"
git push
```

Cada `push` na branch `main` executará um novo deploy automaticamente.
