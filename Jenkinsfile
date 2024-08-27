pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Cloning the repository from GitHub
                git branch: 'user', url: 'https://github.com/VishalVanjari/fundooNotes.git'
            }
        }
        
       stage('Install Dependencies') {
            steps {
                // Installing Node.js dependencies
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }
        
        stage('Deploy') {
            steps {
                // Starting the Node.js application
                echo 'Deploying the application...'
                bat 'npm run dev' // This will start the app in the background
            }
        }
    }
    
    post {
        always {
            // Clean up actions, logs, notifications, etc.
            echo 'Cleaning up...'
        }
        success {
            // Actions on successful pipeline run
            echo 'Pipeline completed successfully!'
        }
        failure {
            // Actions on failed pipeline run
            echo 'Pipeline failed. Check logs for errors.'
        }
    }
}