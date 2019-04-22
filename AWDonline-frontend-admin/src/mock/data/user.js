import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

const Teams=[];

for (let i=0;i<20;i++){
  Teams.push(Mock.mock({
      id:Mock.Random.guid(),
      name:Mock.Random.cname(),
      nickname:Mock.Random.cname(),
      score:10000,
      password:Mock.Random.date()
  }));
}

const Chals=[];

for (let i=0;i<4;i++){
  Chals.push(Mock.mock({
      id:Mock.Random.guid(),
      name:Mock.Random.cname(),
      dockername:Mock.Random.cname(),
      score:200,
      command:Mock.Random.date(),
      flagcommand:Mock.Random.date(),
      desc:Mock.Random.date(),
      type:'web'
  }));
}


const Instances=[];

for (let i=0;i<4;i++){
    Instances.push(Mock.mock({
        id:Mock.Random.guid(),
        name:Mock.Random.cname(),
        teamname:Mock.Random.cname(),
        chalname:Mock.Random.date(),
        ip:Mock.Random.date(),
        password:Mock.Random.date(),
        status:Mock.Random.date()
    }));
}

const Admins=[];
for (let i=0;i<4;i++){
    Admins.push(Mock.mock({
        id:Mock.Random.guid(),
        name:Mock.Random.cname(),
        password:Mock.Random.date()
    }));
}
export { LoginUsers, Users, Teams, Chals, Instances, Admins };
