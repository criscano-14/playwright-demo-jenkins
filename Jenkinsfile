pipeline {
    agent any

    stages {

        stage('Clean Reports') {
        steps {
            bat 'rmdir /s /q allure-report'
            bat 'rmdir /s /q allure-results'
        }
    }

        stage('Build Docker Image') {
            steps {
                    // Forzar reconstrucción sin cache
                bat 'docker-compose -f docker-compose.yml build --no-cache'
                
            }
        }

        stage('Run Tests') {
            steps {
                    // Ejecutar los contenedores y usar el exit code del contenedor de test
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
