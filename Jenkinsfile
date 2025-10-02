pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests in Docker container...'
                // Windows uses bat
                cleanWs()
                bat 'docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from playwright-test'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker containers...'
            bat 'docker-compose -f docker-compose.yml down --volumes --remove-orphans'

            echo 'Publishing Allure report via plugin...'
                allure([
                    includeProperties: false,
                    jdk: '',  // No need for Java inside Docker
                    results: [[path: 'allure-results']]
                ])
        }
    }
}
