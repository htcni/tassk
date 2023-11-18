import { Button, Flex, Menu } from 'antd'
import Title from 'antd/es/typography/Title'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const containerStyle = {
  maxWidth: '1250px',
  margin: '0 auto',
  height: '64px',
}

const Navbar = () => {
  return (
    <Flex justify='space-between' align='center' style={containerStyle}>
      <Flex>
        <Link to={'/'}>
          <Title level={'h3'} style={{ margin: 0, color: '#fff' }}>
            Tassk
          </Title>
        </Link>
      </Flex>
      <Flex gap={8}>
        <Link to={'/login'}>
          <Button type='ghost' style={{ color: 'white' }}>
            Sign In
          </Button>
        </Link>
        <Link to={'/signup'}>
          <Button type='primary'>Get Started</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar
