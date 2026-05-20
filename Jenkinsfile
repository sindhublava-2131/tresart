pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'YOUR_GITHUB_REPO_URL'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Dependency Check') {
            steps {
                bat 'npm audit'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t tresart .'
            }
        }

    }

    post {
        success {
            echo 'TresArt Pipeline Successful'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}