pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'py -3.12 -m venv backend\\fastapi_app\\.venv'
                bat 'backend\\fastapi_app\\.venv\\Scripts\\python.exe -m pip install -r backend\\fastapi_app\\requirements-dev.txt'
                bat 'npm --prefix frontend install'
            }
        }

        stage('Dependency Check') {
            steps {
                bat 'npm --prefix frontend audit'
            }
        }

        stage('Test FastAPI Backend') {
            steps {
                bat 'backend\\fastapi_app\\.venv\\Scripts\\python.exe -m pytest backend\\fastapi_app\\tests'
            }
        }

        stage('Build Vite Frontend') {
            steps {
                bat 'npm --prefix frontend run build'
            }
        }

    }
}