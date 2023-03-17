import React, { useEffect, useRef } from 'react';
import RelationGraph from 'relation-graph/react';
import type { MutableRefObject} from 'react';
import type { RelationGraphExpose, RGJsonData, RGNodeSlotProps, RGOptions, RGLink } from 'relation-graph/react';
const NodeSlot: React.FC<RGNodeSlotProps> = ({node}) => {
  if (node.id === 'current') {
    return <div style={{lineHeight:'24px', width: '100%', height: '100%', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', background: 'linear-gradient(to right, #00FFFF, #FF00FF)'}}>{node.text}</div>
  }
  return <div style={{lineHeight:'38px', width: '100%', height: '100%', border: '#999999 solid 1px', color: '#000000', borderRadius:'50%', boxSizing: 'border-box'}}>{node.text}</div>
}
const RGClock: React.FC = () => {
  const seeksRelationGraph$ = useRef() as MutableRefObject<RelationGraphExpose>;
  useEffect(() => {
    const graphJsonData:RGJsonData = {
      rootId: 'root',
      nodes: [
        { id: 'root', text: '' },
        { id: 'current', text: '' }
      ],
      lines: [],
    };
    for (let i=1;i<61;i++) {
      graphJsonData.nodes.push({ id: i.toString(), text: i.toString() })
      graphJsonData.lines.push({ from: 'root', to: i.toString() })
    }
    seeksRelationGraph$.current.setJsonData(graphJsonData,  true,() => {
      play(1)
    })
  }, [])
  const play = (targetNodeNumber:number) => {
    if (targetNodeNumber > 60) targetNodeNumber = 1;
    const targetNode = seeksRelationGraph$.current.getNodeById(targetNodeNumber.toString());
    const focusNode = seeksRelationGraph$.current.getNodeById('current');
    focusNode.x = targetNode.x;
    focusNode.y = targetNode.y;
    const gInstance = seeksRelationGraph$.current.getInstance();
    gInstance.options.checkedNodeId = 'current'
    gInstance.options.checkedLineId = gInstance.getLinks().find((l:RGLink) => l.toNode.id === targetNode.id).seeks_id
    console.log(gInstance.options.checkedLineId);
    seeksRelationGraph$.current.updateView()
    setTimeout(()=>{play(targetNodeNumber + 1)}, 1000)
  }
  const options:RGOptions = {
    showDebugPanel: true,
    lineUseTextPath: true,
    defaultLineShape: 1,
    placeSingleNode: false,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    layouts: [
      {
        layoutName: 'center'
      }
    ],
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'transparent',
    defaultLineColor: 'rgba(227,226,226,0.3)'
  }
  return <div>
    <div>ok</div>
    <div style={{ height: 600, width: 900, border: '#efefef solid 1px' }}>
      <RelationGraph ref={seeksRelationGraph$} options={options} nodeSlot={NodeSlot} />
    </div>
  </div>
};
export default RGClock;
