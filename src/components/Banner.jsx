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
          <Button
            shape='round'
            size='large'
            type='primary'
            style={{
              marginTop: '2rem',
              fontWeight: '500',
            }}
          >
            Get Started
          </Button>
        </Link>

        <Flex justify='center' style={{ marginTop: '4rem' }}>
          <img
            src='/landing.png'
            width={1200}
            style={{
              borderRadius: '8px',
              boxShadow: 'rgba(100, 100, 111, 0.2), 0px 7px 29px 0px',
            }}
          />
        </Flex>
      </Col>
    </Row>
  )
}

export default Banner
