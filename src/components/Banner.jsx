import { Row, Col, Button, Flex } from 'antd'
import { Link } from 'react-router-dom'

const bannerStyle = {
  background: '#13134e',

  padding: '8rem 1rem',
  fontFamily: 'Work Sans',
}

const titleStyle = {
  fontSize: '54px',
  color: '#fff',
  fontFamily: 'Work Sans',
  fontWeight: '700',
}

const subTitleStyle = {
  fontSize: '20px',
  color: '#fff',
  fontFamily: 'Work Sans',
  fontWeight: '500',
}

const Banner = () => {
  return (
    <Row style={bannerStyle} align={'middle'}>
      <Col span={24} align={'center'}>
        <h1 style={titleStyle}>
          Task Management with breeze.
          <br />{' '}
          <span
            style={{
              color: 'salmon',
              textDecoration: 'underline',
              textDecorationLine: 'underline',
            }}
          >
            Built for productive teams.
          </span>
        </h1>
        <h2 style={subTitleStyle}>
          Get quick and productive with your teammates.
        </h2>
        <Link to={'/signup'}>
          <Button shape='round' size='large' style={{ marginTop: '2rem' }}>
            Get Started
          </Button>
        </Link>

        <Flex justify='center' style={{ marginTop: '4rem' }}>
          <img src='https://placehold.co/1000x800' />
        </Flex>
      </Col>
    </Row>
  )
}

export default Banner
