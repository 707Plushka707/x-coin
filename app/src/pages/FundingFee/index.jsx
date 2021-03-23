import React, { useEffect, useState } from 'react';
import request from '../../utils/request';
import { Column } from '@ant-design/charts';

function FundingFee() {
  useEffect(() => {
    request
      .get('/api/earning/query')
      .then((r) => {
        setData(r);

        const data = [
          { tranId: '1', income: 100 },
          { tranId: '2', income: 300 },
          { tranId: '3', income: 200 },
        ];
        // setData(data);

        console.log(r instanceof Array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [data, setData] = useState([]);

  const config = {
    xField: 'tranId',
    yField: 'income',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle', // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    slider: {
      start: 0.1,
      end: 0.2,
    },
    meta: {
      tranId: {
        alias: '类别',
      },
      income: {
        alias: '销售额',
      },
    },
  };

  return (
    <div>
      <Column {...config} data={data} />
    </div>
  );
}

export default FundingFee;
