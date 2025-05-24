pipeline {
    agent any

    tools {
        nodejs 'Node_24' // Nombre definido en Global Tool Configuration
    }

    stages {
        // Etapa 1: Checkout del código desde GitHub
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/amartinezh/ucp-app-react.git'
            }
        }

        // Etapa 2: Instalar dependencias y construir el proyecto
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build' // Ejecuta el build de React
            }
        }

        // Etapa 3: Ejecutar pruebas unitarias
        stage('Pruebas Unitarias') {
            steps {
                sh 'npm test -- --watchAll=false --ci --reporters=default --reporters=jest-junit' // Genera reporte JUnit
            }
            post {
                always {
                    junit 'junit.xml' // Publica reporte en Jenkins
                    archiveArtifacts artifacts: 'junit.xml', allowEmptyArchive: true
                }
            }
        }
    }

    // Post acciones (opcional)
    post {
    always {
        mail(
            to: 'daniel.tapasco@ucp.edu.co',
            subject: "Build Status: ${currentBuild.currentResult}",
            body: """\
            Job: /github-webhook/
            Estado: ${currentBuild.currentResult}
            URL: /github-webhook/
            """
            )
            }
        }
}
