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
        sh 'git status'
        sh 'git checkout $BRANCH_NAME'
        sh 'git status'
        sh 'git pull origin $BRANCH_NAME'
        sh 'git checkout master'
        sh 'git status'
        sh 'git pull origin master'
        sh 'git status'
        sh 'echo  $BRANCH_NAME'
        sh 'git merge $BRANCH_NAME'
        sh 'git status'
        sh 'git push origin master'
        sh 'echo "where did it all go?"'
        sh 'git status'
      }
    }
    stage('pre-deploy') {
      agent any
      steps {
        sh 'which aws'
      }
    }
  }
  environment {
    HOME = '.'
  }
}