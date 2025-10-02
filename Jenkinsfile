pipeline {
    agent any

    stages {
        stage('Run Tests') {
            bat 'docker-compose -f docker-compose.yml up --build --abort-on-container-exit --exit-code-from playwright-test'
            // Extract reports after container finished
            bat 'docker cp playwright-container:/app/allure-report ./allure-report'
            bat 'docker cp playwright-container:/app/allure-results ./allure-results'
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
