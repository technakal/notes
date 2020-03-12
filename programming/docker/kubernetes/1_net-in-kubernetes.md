# .NET in Kubernetes

## Docker Introduction

- Docker is a packaging, distribution, and runtime for applications.
- With Docker, you just install Docker on your server, then everything else you need to run an application comes within the docker container.
- With docker, you configure your docker image, which is basically a description of what your application needs in order to run, and then you use the docker service to run that image.
- This following example is a docker script for running an old application.
  - Line 1 says, "Use the docker image provided by Microsoft, for ASP.NET 4.8.
  - Copy my configuration files.
  - Execute the files.

```dockerfile
FROM mcr.microsoft.com/dotnet/framework/apsnet:4.8

COPY MyApp.msi /

RUN msiexec /i MyApp.msi /qn
```

- And here's an example dockerfile for a new application:

```dockerfile
# compile from source code
FROM mcr.microsoft.com/dotnet/core/sdk:3.0.100 AS builder

WORKDIR src/
COPY src/ .
RUN dotnet publish -c Release -o /out TODOList.csproj

# app image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.0

WORKDIR /app
ENTRYPOINT ["dotnet", "TODOList.dll"]

COPY --from=builder /out/ .
```

- The docker configuration process creates a docker image, which lives on the machine that built it.
- To get it running elsewhere, you push that docker image to a docker registry.
- To use the application, anyone who has access to that image file just needs to do `docker run`.

### With Old Applications

- When running old applications, you still need a process on the machine to build an MSI.
- You basically do everything the same as before, except you ultimately execute your application via the docker container and application, rather than directly.
- The old way requires your MSI, and you have to configure the docker image to use, for example with ASP.NET, the SDK.

### With New Applications

- When running a new application, for example on .NET core, you don't need anything other than your source code and your dockerfile.

## Kubernetes Introduction

- Kubernetes clusters servers so that you can treat multiple disparate servers as, essentially, an application pool or cluster.
- So, if you have docker installed on some Linux servers and some Windows servers, Kubernetes allows you to treat them as one giant instance.
  - It's a container orchestrator, which decides for you where your application should run.
