import React from 'react';
import ArchieveTable from './ArchiveTable';
import {archieveMenu} from '../../constants/DummyTeamData'
import {useParams} from 'react-router-dom';

export default function Archieve() {
  const {teamName} = useParams()
  
  return (
    <section className="w-full h-screen flex p-25 rounded-lg ">
      <ArchieveTable
        archieveMenu={archieveMenu}
        selectedTeamName={teamName}
      />
    </section>
  );
}
