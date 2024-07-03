import { Character } from '@models/character';
import { Component } from 'react';
import styles from './CharacterView.module.scss';

interface CharacterViewProps {
  name: string;
  gender: string;
  height: string;
}

export class CharacterView extends Component<CharacterViewProps, CharacterViewProps> {
  constructor(props: Character) {
    super(props);
    this.state = {
      name: props.name,
      gender: props.gender,
      height: props.height,
    };
  }

  public render(): React.ReactNode {
    const { name, gender, height } = this.state;

    return (
      <div className={styles.characterBox}>
        <div>Name: {name}</div>
        <div>Gender: {gender}</div>
        <div>Height: {height}</div>
      </div>
    );
  }
}
