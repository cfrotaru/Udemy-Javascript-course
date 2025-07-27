import PreviewView from './previewView';
class ResultsView extends PreviewView {
  _container = document.querySelector('.results');
  _errorMessage = `No recipe was found :'(`;
}

export default new ResultsView();
