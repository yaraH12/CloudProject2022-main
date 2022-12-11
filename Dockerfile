FROM alpine:3.15 as builder

RUN apk add --update nodejs
RUN apk add --update npm

WORKDIR /app


#Ajouter package.json dans le conteneur
COPY . ./

RUN npm install

# Ouvrir le port 8000
EXPOSE 8000

RUN npm run build

#Creer un utilisateur normal pour empecer d'executer l'application en tant qu'administrateur
RUN addgroup -S group1 && adduser -S normalUser -G group1

# Toutes les futurs commandes vont etre executees en tant que normalUser
USER normalUser

CMD ["npm","start"]






# stage exécution
FROM alpine:3.15 as runner

WORKDIR /app

RUN apk add --update nodejs 
#Pas besoin de npm

EXPOSE 8000

COPY --from=builder --chown=normalUser:group1 /app/dist ./
COPY --from=builder --chown=normalUser:group1 /app/node_modules ./
COPY --from=builder --chown=normalUser:group1 /app/src ./
COPY --from=builder --chown=normalUser:group1 /app/package.json ./

USER normalUser

CMD ["npm","start"]