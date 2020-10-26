import React, { useState, useEffect, Fragment } from 'react';
import './App.css'
import { createSquares, getNum, setNum } from './utils'

const rowNum = 6

function Findme() {
  const [squareList, setSquareList] = useState([])
  const [answer, setAnswer] = useState(0)
  const [status, setStatus] = useState(-1)
  const [score, setScore] = useState(0)
  const [highest, setHighest] = useState(0)

  // 选择答案
  function handleSelect(index) {
    if (index === answer) {
      console.log('回答正确')
      const newScore = score + 1
      setScore(newScore)

      // 更新最高分
      isHighestScore(newScore)

      setTimeout(() => {
        nextRound(newScore)
      }, 1000);
    } else {
      console.log('回答错误')
      setScore(0)
    }
    showResult(index, index === answer)
  }

  // 显示结果
  function showResult (index, isRight) {
    const deepClone = JSON.parse(JSON.stringify(squareList))
    deepClone[index] = {
      ...deepClone[index],
      backgroundColor: '#fff',
      borderColor: '#333',
      text: isRight ? '✔' : '✘',
      opacity: 0
    }
    setSquareList(deepClone)
    if (!isRight) {
      setTimeout(() => {
        alert(`选择错误：当前得分${score}，请点击确认重新开始`)
        setSquareList(createSquares(rowNum * 2, 0))
        setAnswer(Math.floor(rowNum * 2 * Math.random()))
        setStatus(-1)
      }, 500);
    }
  }

  function startGame (count = 3) {
    setStatus(count)
    if (count > 0) {
      setTimeout(() => {
        count--
        startGame(count)
      }, 1000);
    }
  }

  // 重新开始一轮
  function nextRound(newScore) {
    const level = Math.floor(newScore / 5)
    const squareNums = Math.min((level + 2) * rowNum, 36)
    setAnswer(Math.floor(squareNums * Math.random()))
    setSquareList(createSquares(squareNums, level))
    startGame()
  }

  // 如果为最高分，则更新
  function isHighestScore (newScore) {
    if (newScore > highest) {
      setHighest(newScore)
      setNum('h', newScore)
    }
  }

  useEffect(() => {
    setSquareList(createSquares(rowNum * 2, 0))
    setAnswer(Math.floor(rowNum * 2 * Math.random()))
    setHighest(getNum('h'))
  }, [])

  function switchStatus (s) {
    if (s === -1) {
     return  <GamePanel onClick={startGame} />
    } else if (s === 0) {
      return <Squares data={squareList} onClick={handleSelect} />
    } else {
      return <Answer status={s} style={squareList[answer]} />
    }
  }


  return (
    <div className="findme">
      <h1 className="title">找方块</h1>
      <div className="findme_wrap">
        {switchStatus(status)}
      </div>
      <p className="score">得分：<span>{score}</span>  &nbsp;&nbsp;&nbsp;&nbsp; 最高分：<span>{highest}</span></p>
    </div>
  )
}

function Answer (props) {
  return (
    <Fragment>
      <div className="box" style={props.style}></div>
      <span className="num">{props.status}</span>
    </Fragment>
  )
}

function Squares (props) {
  function handleSelect (index) {
    props.onClick(index)
  }
  return (
    <ul className="list">
      {props.data.map((option, index) => {
        return <li className="square" onClick={() => handleSelect(index)} key={index} style={option}>{option.text || ' '}</li>
      })}
    </ul>
  )
}

function GamePanel (props) {
  function startGame () {
    props.onClick()
  }
  return (
    <div className="game-panel">
      <div className="rules">
        <h4>游戏规则：</h4>
        1. 记住短暂出现的图案，图案在3秒钟后会消失<br/>
        2. 在众多图案中，选择刚刚消失的图案，选择正确便会加一分<br />
        3. 每连续获得{rowNum}分，图案数量便会增加{rowNum}个，且图案会变得复杂<br />
        4. 如果选择错误，游戏即结束。
      </div>
      <button className="start" onClick={startGame}>开始游戏</button>
    </div>
  )
}

export default Findme