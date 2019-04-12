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
      }
    }
    stage('MergeToMaster') {
      when {
        not {
          branch 'master'
        }
      }
      steps {
        sh 'git pull origin master'
        dir(path: 'cohab_master') {
          sh 'pwd'
        }

      }
    }
  }
  environment {
    HOME = '.'
  }
}
