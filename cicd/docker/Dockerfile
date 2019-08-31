# Generated automatically by generator-cicd-pipeline
# DO NOT EDIT MANUALLY

FROM nginx:1.14-alpine

COPY cicd/docker/nginx/nginx-envsubst.sh /usr/bin/nginx-envsubst

ADD cicd/docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

ADD build/ /var/www/app

CMD ["sh", "-c", "nginx-envsubst && exec nginx -g 'daemon off;'"]
