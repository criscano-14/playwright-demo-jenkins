pipeline {
    agent any

    stages {
        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests in Docker container...'
                bat 'docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from playwright-test'
            }
        }

        stage('Publish Allure Report') {
            steps {
                echo 'Publishing Allure report via plugin...'
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {

            echo 'Copying Allure reports from container to host...'
            bat 'docker cp playwright-container:/app/allure-report .\\allure-report'
            bat 'docker cp playwright-container:/app/allure-results .\\allure-results'

            echo 'Cleaning up Docker containers...'
            bat 'docker-compose -f docker-compose.yml down --volumes --remove-orphans'
        }

        failure {
            echo 'Tests failed! Build marked RED.'
        }

        success {
            echo 'All tests passed! Build marked GREEN.'
        }
    }
}
