FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /
COPY . .
RUN dotnet restore
COPY . .
WORKDIR /src
RUN dotnet build "/Teakorigin.App" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "/Teakorigin.App/Teakorigin.App.csproj" -c Release -o /app/publish

ENV ADVANCED_SITE_URL=http://charts.teakoriginguide.com/

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Teakorigin.App.dll"]