pipeline {
    agent any

    tools {
        nodejs 'Node_24'
        sonarScanner 'SonarQubeScanner' // Configurado en Global Tools
    }

    environment {
        SONAR_PROJECT_KEY = 'ucp-app-react'
        SONAR_PROJECT_NAME = 'UCP React App'
    }

    stages {

        // Etapa 1: Clonar el repositorio
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/danieltapasco/ucp-app-react.git'
            }
        }

        // Etapa 2: Análisis de calidad con SonarQube
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                          -Dsonar.projectName=${SONAR_PROJECT_NAME} \
                          -Dsonar.sources=src \
                          -Dsonar.host.url=http://localhost:9000 \
                          -Dsonar.login=${SONAR_AUTH_TOKEN} \
                          -Dsonar.javascript.node=${NODEJS_HOME}/bin/node \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                    '''
                }
            }
        }

        // Etapa 3: Instalación, build y pruebas con cobertura
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'npm run test:coverage' // Asegúrate de tener este script en tu package.json
            }
        }

        // Puedes agregar aquí más etapas según tus necesidades...
        // Ejemplo: Deploy, Testing en ambiente de staging, etc.
    }

    post {
        always {
            // Validación del Quality Gate de SonarQube
            script {
                def qg = waitForQualityGate()
                if (qg.status != 'OK') {
                    error "Calidad no aprobada: ${qg.status}"
                }
            }

            // Otras tareas post-job (como notificaciones) pueden agregarse aquí
        }
    }
}
