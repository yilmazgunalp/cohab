pipeline {
  agent {
    docker {
      image 'node:10'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run test'
        pwd()
        sh 'echo $USER'
      }
    }
  }
  environment {
    HOME = '\'\'.\''
  }
}