pipeline {
  agent {
    docker {
      image 'node:10'
      args '-p 3000:3000 -u 0'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run test'
        mail(subject: 'buil testing', body: 'hello yg', mimeType: 'text', to: 'yilmazgunalp@gmail.com')
        pwd()
        sh 'echo $USER'
      }
    }
  }
}