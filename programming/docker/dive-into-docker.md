# Dive Into Docker

<!-- TOC -->

- [Dive Into Docker](#dive-into-docker)
  - [Why Docker](#why-docker)
  - [Docker Defined](#docker-defined)
    - [Docker Image](#docker-image)
    - [Docker Container](#docker-container)
  - [Docker for Mac/Windows](#docker-for-macwindows)
  - [Installing Docker](#installing-docker)
    - [On Mac](#on-mac)
    - [On Windows](#on-windows)
      - [Windows Home](#windows-home)
      - [Windows Professional/Enterprise](#windows-professionalenterprise)
    - [On Linux](#on-linux)
  - [The Docker Client](#the-docker-client)
  - [What is a Container?](#what-is-a-container)
  - [How Does Docker Run?](#how-does-docker-run)

<!-- /TOC -->

## Why Docker

- Docker aims to solve the installation problems we encounter when working cross-platform.
- Docker wants to make it as easy as possible to install and run any program on any computer.
- We use Docker because it makes it really easy to install and run software, without worrying about setup and dependencies.

## Docker Defined

- Docker is an ecosystem.
  - Docker Client
  - Docker Server
  - Docker Machine
  - Docker Images
  - Docker Hub
  - Docker
- It's a platform centered around creating and running containers.

### Docker Image

- A Docker image is a single file that contains all of the dependencies and configuration to run a very specific program.
- When you run Docker, the Docker CLI calls out for the image.

### Docker Container

- A Docker container is an instance of a [Docker image](#docker-image).
- It is an instance of a running program, built from that image you downloaded through the CLI.
- A container has its own set of hardware resources allocated to it.

## Docker for Mac/Windows

- Docker installation contains two pieces of software:
  - Docker Client
    - Docker CLI
    - Accepts docker-related commands.
    - This is the part of Docker we interact with.
  - Docker Server
    - Docker Daemon
    - Responsible for creating images, running containers, etc.
    - This part is managed by the Docker CLI.

## Installing Docker

### On Mac

- Check the [Udemy course](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11436624#overview) if you ever need this information.

### On Windows

- Requires Docker account.
  
#### Windows Home

- Windows Home doesn't support Docker CLI.
- Instead, you have to use the Docker Toolbox.
- Check the [Udemy course](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/12918766#overview) if you're ever installing this on Windows Home.

#### Windows Professional/Enterprise

### On Linux

- Check the [Udemy course](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/12920904#overview) if you ever need this information.

## The Docker Client

## What is a Container?

## How Does Docker Run?
