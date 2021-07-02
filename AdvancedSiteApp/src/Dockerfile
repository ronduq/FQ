FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["src/Teakorigin.Advanced.App.csproj", "src/"]
RUN dotnet restore "src/Teakorigin.Advanced.App.csproj"
COPY . .
WORKDIR "/src/src"
RUN dotnet build "Teakorigin.Advanced.App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Teakorigin.Advanced.App.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Teakorigin.Advanced.App.dll"]