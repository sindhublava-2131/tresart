pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Dependency Check') {
            steps {
                bat 'npm audit'
            }
        }

        stage('Build Next.js App') {
            steps {
                bat 'npm run build'
            }
        }

    }
}