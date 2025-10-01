pipeline {
    agent any

    stages {
        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests in Docker container...'
                bat 'docker-compose -f docker-compose.yml up --abort-on-container-exit --exit-code-from tests'
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
            // Publish HTML report from allure-report folder
            echo 'Tests finished. Check Allure report.'
        }

        failure {
            echo 'Tests failed! Build marked RED.'
        }

        success {
            echo 'All tests passed! Build marked GREEN.'
        }
    }
}
