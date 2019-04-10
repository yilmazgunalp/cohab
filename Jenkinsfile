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
        sh 'whoami'
      }
    }
    stage('MergeToMaster') {
      when {
       not {branch 'master'} 
       }
      steps {
        sh 'git pull origin master'
        sh 'git push origin nb:event'
        dir('cohab_master') {
          sh 'pwd'
          }
      }
  }
  environment {
    HOME = '.'
  }
}
}
