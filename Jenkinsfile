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
        sh 'echo hollumoii'
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
        sh 'git config --local --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/*'
        sh 'echo $GIT_CREDENTIALS > "${HOME}/.git-credentials"'
        sh 'git config --global credential.helper "store --file ~/.git-credentials"'
        sh 'git fetch'
        sh 'git checkout $BRANCH_NAME'
        sh 'git pull origin $BRANCH_NAME'
        sh 'git checkout master'
        sh 'git pull origin master'
        sh 'git merge $BRANCH_NAME'
        sh 'git push origin master'
      }
    }
}
  environment {
    HOME = '.'
  }
}
