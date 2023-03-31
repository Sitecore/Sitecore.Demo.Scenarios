FROM sitecore-demo-scenarios-mkdocs:local

WORKDIR /home/site/wwwroot

COPY . ./Sitecore.Demo.Scenarios
