pipeline {
  agent {docker {image 'node:10' args '-p 3000:3000'}}
  environment {HOME = '.'}
  
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run test'
      }
    }
  }
}
